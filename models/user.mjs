import mongoose from "mongoose";

// User model
export default mongoose.model("User", 
    new mongoose.Schema({
        username: String,
        password: String
    })
);