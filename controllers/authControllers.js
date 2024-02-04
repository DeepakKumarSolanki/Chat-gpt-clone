const userModel=require("../models/userModels")
const ErrorResponse = require("../utils/errorResponse");

// JWT TOKEN
exports.sendToken=(user,statusCode,res) => {
const token = user.getSignedToken(res)
res.status(statusCode).json({
    success: true,
    token,
});
}

// REGISTER
exports.registerController=async(req,res,next) => {
try {
    const {username,email,password} = req.body;
    // existing email
    const existingEmail =await userModel.findOne({email})
    if(existingEmail){
        next(new ErrorResponse("Email Already Exists",500))
    }
    // create user

    const user = await userModel.create({username,email,password});
    sendToken(user,201,res);
    
} catch (error) {
   console.log(error);
   next(error); 
}

}


// LOGIN
exports.loginController=async(req,res,next)=>{
try {
 const{email,password} = req.body;

// validation
if(!email||!password){
    next(new ErrorResponse("Please Provide Email or Password"))
}

const searchUser=await userModel.findOne({email});
    if(!user){
        next(new ErrorResponse("Invalid Credetials",401))
    }

    const isMatch=await searchUser.matchPassword(password);
    if(!isMatch){
next(new ErrorResponse("Invalid Details"))
    }

    this.sendToken(user,200,res);
} 

catch (error) {
    console.log(error);
   next(error); 
}
}


// LOGOUT
exports.logoutController=async(req,res)=>{
    res.clearCookie("refreshToken")
    return res.status(200).json({
        success:true,
        message: "Successfully logged out"
    })
}