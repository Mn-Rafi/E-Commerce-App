var express = require("express");
var router = express.Router();
const productHelpers = require("../helpers/product-helpers");
const userHelpers = require("../helpers/user-helpers");

const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/", function (req, res, next) {
  let user = req.session.user;
  productHelpers.getAllProducts().then((products) => {
    res.render("user/view-products", {
      title: "E Cart - Products Page",
      products,
      user,
      isAdmin: false,
      isProductsEmpty: products.length === 0,
    });
  });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("user/login", { loginError: req.session.loginErr });
    req.session.loginErr = false;
  }
});

router.post("/login", (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect("/");
    } else {
      req.session.loginErr = response.messsage;
      res.redirect("/login");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

router.get("/signup", (req, res) => {
  res.render("user/signup");
});

router.post("/signup", (req, res) => {
  userHelpers.doSignUp(req.body).then((data) => {
    req.session.loggedIn = true;
    req.session.user = data;
    res.redirect("/");
  });
});

router.get("/cart", verifyLogin, (req, res) => {
  let user = req.session.user;
  res.render("user/cart", {user});
});

module.exports = router;
