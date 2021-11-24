import mongoose from "mongoose";
import { DB, settings, url } from "../../resource/resource.mjs";
import app from "../../app/config.mjs";

let Csession;

// Delete an user

app.post("/delete", (req, res) => {
    Csession = req.session;
    if (Csession.userID)
        mongoose.connect(url, settings)
            .then(() => {
                return DB.sites.deleteMany({
                    user: Csession.userID
                });
            })
            .then(() => {
                return DB.users.deleteOne({
                    username: Csession.userID
                })
            })
            .catch(err => {
                throw err;
            });
    // Logout
    res.redirect("/logout");
});

// Delete an article

app.post("/article/delete", (req, res) => {
    Csession = req.session;
    if (Csession.userID) {
        mongoose.connect(url, settings)
            .then(() => {
                return DB.sites.deleteOne({
                    user: Csession.userID,
                    name: req.body.name
                })
            })
            .catch(err => {
                throw err;
            });
    }
    // Redirect to homepage
    res.redirect("/article");
}) 