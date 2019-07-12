const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = app => {
  // Load signup page
  app.get("/", (req, res) => {
    db.Category.findAll({}).then(function (catData) {
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
    db.Category.findAll({}).then(function (catData) {
      var data = { categories: catData };
      if (req.user) {
        data.user = req.user.name;
      }
      res.render("shoppingcart", data);
    });
  });

  // get all product by id
  app.get("/products/:id", function (req, res) {
    db.Category.findAll({}).then(function (catData) {
      var data = { categories: catData };
      if (req.user) {
        data.user = req.user.name;
      }

      db.Product.findAll({
        where: {
          CategoryId: req.params.id
        }
      }).then(function (dbProduct) {
        data.products = dbProduct;

        res.render("products", data);
      });
    });
  });

  // create shopping cart

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => res.render("404"));
};
