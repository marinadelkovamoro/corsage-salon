const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = app => {
  function updateInventory(newInv, res) {
    console.log(newInv);
    // db.Product.update(
    //   { quantity: newInv[0].newQuantity },
    //   {
    //     where: {
    //       id: newInv[0].id
    //     }
    //   }
    // ).then(result => {
    //   res.json(result);
    // });
  }

  function saveCart(userId, cartData, res) {
    var ptotal = 0;

    for (var i = 0; i < cartData.length; i++) {
      cartData[i].id = parseInt(cartData[i].id);
      cartData[i].price = parseInt(cartData[i].price);
      cartData[i].numItems = parseInt(cartData[i].numItems);
      ptotal += cartData[i].price * cartData[i].numItems;
    }
    // 1. create a record in Order table.
    db.Order.create({
      total: ptotal,
      UserId: userId
    })
      .then(dbCreate => {
        // console.log(dbCreate);
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
        db.Product.findAll({}).then(function(products) {
          // console.log(products);
          var updateList = [];

          for (var x = 0; x < cartData.length; x++) {
            // console.log(cartData[x]);
            for (var i = 0; i < products.length; i++) {
              // console.log(products[i].dataValues);
              if (cartData[x].id === products[i].id) {
                var item = {
                  id: cartData[x].id,
                  newQuantity: products[i].quantity - cartData[x].numItems
                };
                updateList.push(item);
                break;
              }
            }
          }
          updateInventory(updateList, res);
        });
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
      res.status(401).end();
    }
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
;