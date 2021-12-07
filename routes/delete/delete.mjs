import { DB } from "../../resource/resource.mjs";
import app from "../../app/config.mjs";

// Delete an user

app.post("/delete", async (req, res) =>
    req.session?.userID ?
        Promise.all([
            DB.sites.deleteMany({
                user: req.session.userID
            }), DB.users.deleteOne({
                username: req.session.userID
            })
        ]).then(() => res.redirect("/logout"))
    : res.redirect("/logout")
);

// Delete an article

app.post("/article/delete", (req, res) =>
    DB.sites.deleteOne({
        user: req.session?.userID ?? "",
        name: req.body.name
    }).then(() => res.redirect("/article"))
) 