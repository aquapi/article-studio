import { DB, errHandler } from "../../resource/resource.mjs";
import app from "../../app/config.mjs";

let Csession;

// Delete an user

app.post("/delete", (req, res) => {
    Csession = req.session;
    if (Csession.userID)
        DB.sites.deleteMany({
            user: Csession.userID
        }, err => {
            if (err) throw err;
            DB.users.deleteOne({
                username: Csession.userID
            }, errHandler)
        })
    // Logout
    res.redirect("/logout");
});

// Delete an article

app.post("/article/delete", (req, res) => {
    Csession = req.session;
    if (Csession.userID) {
        DB.sites.deleteOne({
            user: Csession.userID,
            name: req.body.name
        }, (err) => {
            if (err) throw err;
        });
    }
    // Redirect to homepage
    res.redirect("/article");
}) 