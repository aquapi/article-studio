import { DB } from "../../app/resource.mjs";
import app from "../../app/servers/express.mjs";

// Delete an user
app.post("/delete", async (req, res) =>
    req.session?.userID ?
        (
            await Promise.all([
                DB.sites.deleteMany({
                    user: req.session.userID
                }), DB.users.deleteOne({
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
        await DB.sites.deleteOne({
            user: req.session?.userID ?? "",
            name: req.body.name
        }), 
        res.redirect("/article") 
    )
);