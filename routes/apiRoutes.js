const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = app => {
  function updateInventory(newInv, currIndex, res) {

    db.Product.update(
      { quantity: newInv[currIndex].newQuantity },
      {
        where: {
          id: newInv[currIndex].id
        }
      }
    ).then(result => {
      currIndex++;
      if (currIndex < newInv.length) {
        updateInventory(newInv, currIndex, res);
      } else {
        res.json(result);
      }
    });
  }

  function saveCart(userId, cartData, res) {
    // first : check if enough item in stock.
    // also create array of product inventory that will be used for updating inventory after purchase.
    var ptotal = 0;
    for (var i = 0; i < cartData.length; i++) {
      cartData[i].id = parseInt(cartData[i].id);
      cartData[i].price = parseInt(cartData[i].price);
      cartData[i].numItems = parseInt(cartData[i].numItems);
      ptotal += cartData[i].price * cartData[i].numItems;
    }

    db.Product.findAll({}).then(function(products) {
      var updateList = [];
      var outList = [];
      for (var x = 0; x < cartData.length; x++) {
        for (var i = 0; i < products.length; i++) {
          if (cartData[x].id === products[i].id) {
            if (products[i].quantity < cartData[x].numItems) {
              var item = { 
                id: cartData[x].id ,
                numItems: products[i].quantity
              };
              outList.push(item);
            } else {
              var item = {
                id: cartData[x].id,
                newQuantity: products[i].quantity - cartData[x].numItems
              };
              updateList.push(item);
            }
            break;
          }
        }
      }
      console.log(outList);
      if (outList.length > 0) {
        // not enough inventory
        res.status(601).json(outList);
      } else {
        // all good.
        // 1. create a record in Order table.
        db.Order.create({
          total: ptotal,
          UserId: userId
        })
          .then(dbCreate => {
            // 2. create records in transaction table.
            var transArr = [];
            for (var i = 0; i < cartData.length; i++) {
              var trans = {
                numberofItems: cartData[i].numItems,
                price: cartData[i].price,
                OrderId: dbCreate.id,
                ProductId: cartData[i].id
              };
              transArr.push(trans);
            }
            return db.Transaction.bulkCreate(transArr);
          })
          .then(() => {
            // 3. Update inventory
            updateInventory(updateList, 0, res);
          });
      }
    });
  }

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed

    res.json("/");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  // {
  //   email: req.body.email,
  //   password: req.body.password
  // }
  app.post("/api/signup", (req, res) => {
    db.User.create(req.body)
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(422).json(err.errors[0].message);
      });
  });

  app.post("/api/orders", function(req, res) {
    if (req.user) {
      saveCart(req.user.id, req.body.order, res);
    } else {
      // not logged in
      // res.status(401).json({ test: "hello"} );
      res.status(401).end();
    }
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
