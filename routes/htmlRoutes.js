const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = app => {
  // Load signup page
  app.get("/", (req, res) => {
    db.Category.findAll({}).then(function(catData) {
      var data = { categories: catData };
      if (req.user) {
        data.user = req.user.name;
      }
      res.render("about", data);
    });
  });

  // Load login page
  app.get("/login", (req, res) =>
    res.render("login", { islogin: true, layout: "blank" })
  );

  // Load Signup page
  app.get("/signup", (req, res) =>
    res.render("login", { islogin: false, layout: "blank" })
  );

  app.get("/cart", (req, res) => {
    db.Category.findAll({}).then(function(catData) {
      var data = { categories: catData };
      if (req.user) {
        data.user = req.user.name;
      }
      // data.bitcoinRate = global.bitcoinRate;
      res.render("shoppingcart", data);
    });
  });

 

  // get all product by id
  app.get("/products/:id", function(req, res) {
    db.Category.findAll({}).then(function(catData) {
      var data = { categories: catData };
      data.calculateBitcoin = 0.0;
      if (req.user) {
        data.user = req.user.name;
      }
      db.Product.findAll({
        where: {
          CategoryId: req.params.id
        }
      }).then(function(dbProduct) {
        data.products = dbProduct;
        res.render("products", data);
      });
    });
  });

  // PUT route for updating posts
  app.put("/products", (req, res) => {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    db.Product.update(
      {
        quantity: req.body.quantity
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(updateProduct => {
      res.json(updateProduct);
    });
  });

  // create shopping cart

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => res.render("404"));
};
