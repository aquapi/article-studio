import mongoose from "mongoose";

// Article model
const Article = mongoose.model("Site", 
    new mongoose.Schema({
        user: String,
        name: String,
        content: String,
        display_img: String,
        description: String,
        views: Number,
        tag: String,
        votes: Number,
        private: Boolean,
        coAuthor: [String],
    })
);

// Export model
export default Article;

