import mongoose from "mongoose";

// User schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// User models
const User = mongoose.model("User", userSchema);  

export default User;