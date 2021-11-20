import app from "../../app/config.js";
import { DB, settings, url } from "../../resource/resource.js"
import mongoose from "mongoose";
import fs from "fs";
import handlebars from "handlebars";

let Csession;

// Discuss page
app.get("/discuss/:name", (req, res) => {
    Csession = req.session;
    mongoose.connect(url, settings)
        .then(() => {
            return DB.sites.find({
                name: req.params.name
            });
        })
        .then(r => {
            if (!r || !req.params.name)
                res.redirect("/article");
            else {
                const template = handlebars.compile(fs.readFileSync("./views/discuss/discuss.html").toString());
                res.end(template({
                    name: req.params.name,
                    user: Csession.userID ?? "User" + Math.round(Math.random() * 100000)  
                }));
            }
        })
        .catch(err => {
            throw err;
        });
});
