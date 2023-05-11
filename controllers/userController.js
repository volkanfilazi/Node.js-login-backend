const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")

const createUser = asyncHandler( async(req, res) => {
  try {
    const {username, email, password, admin} = req.body
  const checkEmail = await User.findOne({ email })

  if(!username && !email && !password){
    res.status(400)
    throw new Error("All inputs are required")
  }else if(!email){
    res.status(400)
    throw new Error("Email is required")
  }else if(!username){
    throw new Error("Username is required")
  }else if(!password){
    throw new Error("Password is required")
  }else if(checkEmail){
    res.status(400)
    throw new Error("There is already this email address")
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  console.log("hashed password", hashedPassword);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    admin
  })

  if(newUser){
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      admin: newUser.admin
    })
  }else{
    res.status(400)
    throw new Error("User is not valid")
  }
  } catch (error) {
    res.status(400).json({ error: "User is not valid"})
  }

})

const getUsers = asyncHandler( async(req, res) => {
  const users = await User.find()
  res.status(200).json(users)
})

const deleteUser = asyncHandler( async(req, res) => {
  try {
    const user = await User.findById(req.params.id)
  if(!user){
    res.status(404)
    throw new Error("User not found")
  }
  const removedUser = await User.findByIdAndDelete(
    req.params.id
  )
  res.status(201).json(removedUser)
  } catch (error) {
    res.status(400).json({ error: "User id not found"})
  }
})

const updateUser = asyncHandler( async(req, res) =>{
  try {
    const user = await User.findById(req.params.id)
  if(!user){
    res.status(404)
    throw new Error("User not found")
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
    )
    res.status(201).json(updatedUser)
  } catch (error) {
    res.status(400).json({ error: "User not found"})
  }
})

const getSingleUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});
module.exports = { createUser, getUsers, deleteUser, updateUser, getSingleUser }