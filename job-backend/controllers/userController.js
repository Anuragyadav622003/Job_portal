import { cathAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import User from "../modals/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register=cathAsyncError(async(req,res,next)=>{
 const {name,email,phone,role,password} = req.body;
 console.log(req.body);
 if(!name || !email || !phone || !role || !password)
 {
    return next(new ErrorHandler("🙏 🙏 Please provide all details of form!"));
 }
  const isEmail = await User.findOne({email})
  if(isEmail){
    return next(new ErrorHandler(" Email Already exist!"));
     
  }
  //create new user
  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });
   sendToken(user,200,res,"User Register Successfully!");
});

export const login = cathAsyncError(async(req,res,next)=>{
   const {email,password,role} = req.body;
   console.log(req.body)
   if(!email || !password || !role)
   {
    return next(new ErrorHandler("Please Provide email,password and role.",400))
   }
   const user = await User.findOne({email}).select("+password");
  console.log(user);
   if(!user){
      return next(new ErrorHandler("Invalid Email or Password",400));
   }
   const isPasswordMatch = await user.comparePassword(password);

   if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid Email or Password", 400));
   }

   if(user.role!==role){
     return next(new ErrorHandler("User with this role not found", 400));
   }
   sendToken(user,200,res,"User logged Successfully!");
})

export const logout = cathAsyncError(async(req,res,next)=>{
    res
      .status(201)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: true,
        sameSite: "None",
      })
      .json({
        succuss: true,
        message: "User logged out successfully!",
      });
})

export const getUser = cathAsyncError((req,res,next)=>{
  const user = req.user;
  res.status(200).json({
    success:true,
    user,
  });
});