var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  const products = [
    {
      name: "IPHONE 11",
      category: "Mobile",
      description: "This is a good phone. Please buy",
      image:
        "https://cdn1.smartprix.com/rx-i23Hwk3oU-w420-h420/apple-iphone-11.jpg",
    },
    {
      name: "KADALAMUTTAYI",
      category: "Sweet",
      description: "Kerala special home made sweet",
      image:
        "https://www.gramiyum.in/wp-content/uploads/2019/01/Kadalai-mittai.jpg",
    },
    {
      name: "TATA NANO",
      category: "Car",
      description: "A perfect car for a middle class family",
      image:
        "https://imgd.aeplcdn.com/664x374/cw/ec/10441/Tata-Nano-Exterior-118090.jpg?wm=0&q=75",
    },
    {
      name: "CHICKEN 65",
      category: "Food",
      description: "A chicken curry made up of meet preserved for 65 days",
      image:
        "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/chicken-65-restaurant-style-500x375.jpg",
    },
  ];
  res.render("admin/view-products", {
    title: "E Cart - View Products",
    products,
    isAdmin: true,
  });
});

router.get('/add-product',(req,res)=>{
  res.render('admin/add-product'), {
    title: "E Cart - Add Product",
    isAdmin: true,
  }
});

router.post('/add-product',(req,res)=>{
  console.log(req.body)
  console.log(req.files.image);
});

module.exports = router;
