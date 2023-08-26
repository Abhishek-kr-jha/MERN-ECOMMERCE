const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
const Jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [30, "name cannot exced 30 characters"],
    minlength: [4, "name sshould more then 4 char"],
    select: false,
  },
  password:{
    type: String,
    required: [true, "Please enter  your password"],
    minlength:[8,"password is greater than 8 chars"],
    select:false
  },
  email:{
    type:String,
    unique:true,
    validate:[validator.isEmail,"Please Enter a valid Email"]
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role:{
    type:String,
    default:"user",
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,

});
userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next()
  }
  
  this.password= await bcrypt.hash(this.password,10)
})
// JWT Token

userSchema.methods.getJWTToken = function(){
  return Jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE,

  })
  
};
// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)

}
module.exports = mongoose.model("User",userSchema)
