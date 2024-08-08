import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "😒😒 please provide name"],
    minlength: [3, "😒😒 name must be atleast 3 character!"],
    maxlength: [20, "😒😒 name cannot exceed 30 character!"],
  },
  email: {
    type: String,
    required: [true, "😒😒please provide your email"],
    validate: [validator.isEmail, "😒😒please provide a valid email"],
  },
  phone: {
    type: Number,
    required: [true, "😒😒please provide phone number"],
  },
  password: {
    type: String,
    required: [true, "😒😒please provide your password"],
    minlength: [5, "😒😒 password must be atleast 5 character!"],
    maxlength: [32, "😒😒 password cannot exceed 30 character!"],
    select:false,
  },
  role: {
    type: String,
    enum: ["job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//hashing password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
         next()
    }
    this.password = await bcrypt.hash(this.password,10);
})

//campare password
userSchema.methods.comparePassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

//generate jwtoken for athorization
userSchema.methods.getJWTToken =  function () {
  return jwt.sign({ id: this._id },
     process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;

