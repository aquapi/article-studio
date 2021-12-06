import { DB } from "../../resource/resource.mjs";
import app from "../../app/config.mjs";

// Delete an user

app.post("/delete", async (req, res) => {
    if (req.session?.userID)
        await DB.sites.deleteMany({
            user: req.session.userID
        }).then(_ =>
            DB.users.deleteOne({
                username: req.session.userID
            })
        );
    // Logout
    res.redirect("/logout");
});

// Delete an article

app.post("/article/delete", async (req, res) => {
    await DB.sites.deleteOne({
        user: req.session?.userID ?? "",
        name: req.body.name
    });
    // Redirect to homepage
    res.redirect("/article");
}) 