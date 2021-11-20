import fs from "fs";
import handlebars from "handlebars";
import mongoose from "mongoose";
import { DB, settings, url } from "../../resource/resource.js";
import app from "../../app/config.js";

let Csession;

// User's Profile
app.get("/article/profile", (req, res) => {
    Csession = req.session;
    mongoose.connect(url, settings)
        .then(() => {
            return DB.users.findOne({
                username: Csession.userID ?? ""
            })
        })
        .then(r => {
            if (!r || !r.username || !r.password)
                res.redirect("/login");
            else {
                fs.readFile("./views/account/profile.html", (err, data) => {
                    if (err) throw err;
                    let template = handlebars.compile(data.toString());
                    res.write(template({
                        name: r.username,
                        pass: r.password
                    }));
                    return res.end();
                });
            }
        })
        .catch(err => {
            throw err;
        });
});
