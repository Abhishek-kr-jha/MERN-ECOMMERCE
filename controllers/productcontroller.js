const product = require("../modals/productModels");

// create a products-- Admin
exports.createProduct = async (req, res, next) => {
  const newProduct = await product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
};

// get all the products

exports.getAllProducts = async (req, res) => {
  const Products = await product.find();
  res.status(200).json({ success: true, Products });
};

//  get a single Product
exports.getProductDetails = async(req,res,next)=>{
  
  
  const Products = await product.findById(req.params.id);
  
  if(!Products){
    return next(new ErrorHandler("Product not found ", 404));
}
res.status(200).json({
  success:true,
  product,
  message:"product feteched successfully"
})

}

// update product -- Admin
exports.updatedproduct = async (req, res, next) => {
  let Products = await product.findById(req.params.id);
  if (!Products) {
    return res.status(500).json({
      succes: false,
      message: "Product not found",
    });
  }
  Products = await product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    Products,
  });
};

// delete Products
exports.deleteproducts = async(req,res,next)=>{
    const Products = await product.findByIdAndDelete(req.params.id);
    if(!Products){
        return res.status(500).json({
            succes:true,
            message:"Product not found"
        })
    }
  
    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })
}