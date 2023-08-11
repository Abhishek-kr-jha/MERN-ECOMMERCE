const express = require("express");
const { getAllProducts, createProduct, updatedproduct, deleteproducts, getProductDetails } = require("../controllers/productcontroller");
const router = express.Router();


router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updatedproduct)
router.route("/product/:id").delete(deleteproducts)
router.route("product/:id").get(getProductDetails)
module.exports = router;