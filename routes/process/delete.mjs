import Article from "../../models/article.mjs";
import User from "../../models/user.mjs";
import app from "../../app/loaders/express.mjs";

// Delete an user
app.post("/delete", async (req, res) =>
    req.session?.userID ?
        (
            await Promise.all([
                Article.deleteMany({
                    user: req.session.userID
                }), User.deleteOne({
                    username: req.session.userID
                })
            ]), 
            res.redirect("/logout")
        )
    : res.redirect("/logout")
); 

// Delete an article
app.post("/article/delete", async (req, res) =>
    (
        await Article.deleteOne({
            user: req.session?.userID ?? "",
            name: req.body.name
        }), 
        res.redirect("/article") 
    )
);