var express = require("express");
const productHelpers = require("../helpers/product-helpers");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  productHelpers.getAllProducts().then((products) => {
    console.log(products);
    res.render("admin/view-products", {
      title: "E Cart - View Products",
      products,
      isAdmin: true,
    });
  });
});

router.get("/add-product", (req, res) => {
  res.render("admin/add-product"),
    {
      title: "E Cart - Add Product",
      isAdmin: true,
    };
});

router.post("/add-product", (req, res) => {
  productHelpers.addProduct(req.body, (id) => {
    console.log(id);
    let image = req.files.image;
    const imageName = id;
    image.mv("./public/product-images/" + imageName + ".jpg", (err, done) => {
      if (!err) {
        productHelpers.getAllProducts().then((products) => {
          console.log(products);
          res.render("admin/view-products", {
            title: "E Cart - View Products",
            products,
            isAdmin: true,
          });
        });
      } else {
        console.log("error");
        console.log(err);
      }
    });
  });
});

module.exports = router;
