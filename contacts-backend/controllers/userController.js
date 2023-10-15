const asyncHandler = require("express-async-handler");
const User = require ("../models/userModel");
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const userAvailable = await User.findOne({ email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    const user = await User.create({
        username, email,password,
    })
    res.status(201).json(user);})

//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req, res) => {
    res.json({ message: "login user"});
})

//@desc current user info
//@route POST /api/users/login
//@access private
const currentUser = asyncHandler(async(req, res) => {
    res.json({ message: "current user info"});
})

module.exports = {registerUser, loginUser, currentUser};