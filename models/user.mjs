import mongoose from "mongoose";

// User model
const User = mongoose.model("User", 
    new mongoose.Schema({
        username: String,
        password: String
    })
);

// Export user model
export default User;