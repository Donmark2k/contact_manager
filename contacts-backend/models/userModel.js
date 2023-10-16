const mongoose = require("mongoose");

const userSchema = mongoose.Schema ({
    username: {
        type: String, 
        required: [true, "Please add the username"]
    },
    email: {
        type: String, 
        required: [true, "Please add the contact email address"],
        unique: [ true, "email address already exist"]
    },
    password: {
        type: String, 
        required: [true, "Please enter your password"],
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("User",userSchema);