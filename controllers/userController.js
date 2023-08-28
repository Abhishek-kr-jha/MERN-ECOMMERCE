const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../Middleware/catchAsyncError");
const User = require("../modals/userModels");
const { Error } = require("mongoose");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const { reset } = require("nodemon");

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
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Pasdword", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password ", 401));
  }

  sendToken(user, 201, res);
});

// logout user

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
// forget Password
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  // get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/passord/reset/${resetToken}`;
  const message = `your password resettoken is:- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then, please ignore it`;
  try {
    
    await sendEmail({
      email: user.email,
      subject:`Ecommerce Password Recovery`,
      message,

    });
    res.status(200).json({
      success:true,
      message: `Email sent to ${user.email} successfully`
    })
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave:false});
    return next(new ErrorHandler(error.message,500))
    
  }
});
