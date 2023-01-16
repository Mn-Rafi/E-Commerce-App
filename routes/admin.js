var express = require("express");
const productHelpers = require("../helpers/product-helpers");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  productHelpers.getAllProducts().then((products) => {
    res.render("admin/view-products", {
      title: "E Cart - View Products",
      products: products,
      isAdmin: true,
    });
  });
});

router.get("/add-product", (req, res) => {
  let product = req.session.product;
  res.render("admin/add-product", {
    product: product,
    title: "E Cart - Product",
    isAdmin: true,
  });
  req.session.product = false;
});

router.post("/add-product", (req, res) => {
  productHelpers.addProduct(req.body, (id) => {
    let image = req.files.image;
    const imageName = id;
    image.mv("./public/product-images/" + imageName + ".jpg", (err, done) => {
      if (!err) {
        productHelpers.getAllProducts().then((products) => {
          res.render("admin/view-products", {
            title: "E Cart - View Products",
            products,
            isAdmin: true,
          });
        });
      }
    });
  });
});

router.get("/delete-product/", (req, res) => {
  let productId = req.query.id;
  productHelpers.deleteProductById(productId).then((response) => {
    if (response) {
      res.redirect("/admin");
    }
  });
});

router.get("/edit-product/", async (req, res) => {
  let productId = req.query.id;
  let product = await productHelpers.getProductById(productId);
  if (product) {
    req.session.product = product;
    console.log(req.session.product);
    res.redirect("/admin/add-product");
  }
});

router.post("/edit-product/", (req, res) => {
  let productId = req.query.id;
  productHelpers.updateProductById(productId, req.body).then((response) => {
    res.redirect("/admin");
    if (req.files.image) {
      req.files.image.mv("./public/product-images/" + productId + ".jpg");
    }
  });
});

module.exports = router;
