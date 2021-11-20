import mongoose from "mongoose";

// Article Schema
const articleSchema = new mongoose.Schema({
    user: String,
    name: String,
    content: String,
    display_img: String,
    description: String,
    views: Number,
    tag: String,
    votes: Number
});

// Article Models
const Article = mongoose.model("Site", articleSchema);

export default Article;

