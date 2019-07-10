const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = app => {
  // Load signup page
  app.get("/", (req, res) => {
    var data = {};
    if (req.user) {
      data.user = req.user.name;
    }
    res.render("about", data);
  });

  // Load login page
  app.get("/login", (req, res) => res.render("login", { islogin:true, layout: 'blank'}));

  // Load Signup page
  app.get("/signup", (req, res) => res.render("login", { islogin:false, layout: 'blank'}));

  // Load profile page
  app.get("/profile", isAuthenticated, (req, res) => {
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then(dbUser => {
      // kktodo : go to current page
      res.render("profile", { user: dbUser });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", isAuthenticated, (req, res) => {
    db.Example.findOne({ where: { id: req.params.id } }).then(dbExample => {
      res.render("example", {
        example: dbExample,
        user: req.user
      });
    });
  });

  app.get("/products/:id", function(req, res) {
    db.Product.findAll({
      where: {
        CategoryId: req.params.id
      }
    }).then(function(dbProduct) {
      // console.log(dbProduct);
      res.render("products", {
        products: dbProduct
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => res.render("404"));
};
