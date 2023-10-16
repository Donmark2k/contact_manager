const asyncHandler = require("express-async-handler");
const User = require ("../models/userModel");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    const userAvailable = await User.findOne({ email});
    if (userAvailable) {
        res.status(400).json({ error: "User already registered" });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword );
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User Created  ${user}`);

    if (user) {
        res.status(201).json({_id: user.id, email: user.email});
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.status(201).json(user);
})

//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("Email or Password is not valid");
    }
    // res.json({ message: "login user"});
})

//@desc current user info
//@route POST /api/users/login
//@access private
const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user);
})

module.exports = {registerUser, loginUser, currentUser};