const express = require("express");
const { getAllProducts, createProduct, updatedproduct, deleteproducts, getProductDetails } = require("../controllers/productcontroller");
const { isAuthenticatedUser,authorizeRoles } = require("../Middleware/auth");
const router = express.Router();


router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser,createProduct);
router.route("/product/:id").put(isAuthenticatedUser,updatedproduct)
router.route("/product/:id").delete(isAuthenticatedUser,deleteproducts)
router.route("product/:id").get(getProductDetails)
module.exports = router;