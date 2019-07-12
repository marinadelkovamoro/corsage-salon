const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = app => {
  // Get all examples -- kktodo
  app.get("/api/examples", isAuthenticated, (req, res) => {
    db.Example.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(dbExamples => {
      res.json(dbExamples);
    });
  });

  // Create new product endpoint. TODO Call on Coinbase API to generate checkout link.
  app.post("/api/products", (req, res) => {
  // TODO Step 1) Create bitcoin checkout page link here
  // Step 2) Create product
    db.Product.create({
      name: req.body.name,
      quantity: req.body.quantity,
      image: req.body.image,
      details: req.body.details,
      price: req.body.price,
      CategoryId: req.body.CategoryId
    }).then(product_returned => {
      console.log("Product created");
      console.log(product_returned);
      console.log(" ");
      console.log(" ");
      res.json(product_returned);
    });
  });

  // Create a new example
  // Create a new example - kktodo
  app.post("/api/examples", isAuthenticated, (req, res) => {
    db.Example.create({
      UserId: req.user.id,
      text: req.body.text,
      description: req.body.description
    }).then(dbExample => {
      res.json(dbExample);
    });
  });

  // Delete an example by id  -kktodo
  app.delete("/api/examples/:id", isAuthenticated, (req, res) => {
    db.Example.destroy({ where: { id: req.params.id } }).then(dbExample => {
      res.json(dbExample);
    });
  });

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

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // app.post("/api/order", (req, res) => {
  //   db.Order.create(req.body)
  //   .then(function(){
  //     res.
  //   });
  // });
};
