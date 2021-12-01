import { DB } from "../../resource/resource.mjs";
import app from "../../app/config.mjs";

let Csession;

// Delete an user

app.post("/delete", async (req, res) => {
    Csession = req.session;
    if (Csession.userID)
        await DB.sites.deleteMany({
            user: Csession.userID
        });
        await DB.users.deleteOne({
            username: Csession.userID
        });
    // Logout
    res.redirect("/logout");
});

// Delete an article

app.post("/article/delete", async (req, res) => {
    Csession = req.session;
    if (Csession.userID) {
        await DB.sites.deleteOne({
            user: Csession.userID,
            name: req.body.name
        });
    }
    // Redirect to homepage
    res.redirect("/article");
}) 