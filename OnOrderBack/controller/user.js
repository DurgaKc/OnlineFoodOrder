const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


// To register new user

const registerUser = async(req,res)=>{
const email = req.body.email.trim().toLowerCase();
const password = req.body.password;
if(!email ||!password)
{
    return res.status(400).json({message:"Email and password is required"})
}
let user=await User.findOne({email})
if(user){
    return res.status(400).json({error:"Email is Already exists"})
}
const hashPwd=await bcrypt.hash(password,10)
const newUser=await User.create({
    email,
    password:hashPwd
})
let token=jwt.sign(
    {email,id:newUser._id},
    process.env.SECRET_KEY)
return res.status(200).json({token,newUser})
}


// To login  user

const userLogin=async(req,res)=>{
const {email,password}=req.body
if(!email ||!password)
{
    return res.status(400).json({message:"Email and password is required"})
}
let user = await User.findOne({email})
if(user && await bcrypt.compare(password,user.password)){
let token=jwt.sign(
  {email,id:user._id},
  process.env.SECRET_KEY)
return res.status(200).json({token,user})
}
else{
    return res.status(400).json({error:"Invalid credentials"})
}}

   // To Change password

const changePassword = async (req, res) => {
const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; // from JWT middleware
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both old and new passwords are required" });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { registerUser, userLogin, changePassword };