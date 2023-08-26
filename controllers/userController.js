const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../Middleware/catchAsyncError");
const User = require("../modals/userModels");
const { Error } = require("mongoose");

//Register  a user
exports.registerUser = catchAsyncError(async (req, res, next) => {

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is a sample id url",
      url: "profilepicUrl",
    },
  });
  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
  });
});

// login a user
exports.loginUser = catchAsyncError(async (req,res,next)=>{
  const {email,password}= req.body;

  // checking if user has given password and email both

  if(!email || !password){
    return next(new ErrorHandler("Please Enter Email and Pasdword",400))
  }
const user =  await User.findOne({email}).select("+password");
if(!user){
  return next(new ErrorHandler("Invalid email or password",401))
}

const isPasswordMatched= user.comparePassword(password);
if(!isPasswordMatched){
  return next(new ErrorHandler("Invalid email or password ",401))
}

const token = user.getJWTToken();
res.status(200).json({
  success: true,
  token,
});

} )