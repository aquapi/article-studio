import app from "../../app/config.mjs";
import { DB } from "../../resource/resource.mjs"
import fs from "fs";
import handlebars from "handlebars";

let Csession;

// Discuss page
app.get("/discuss/:name", (req, res) => {
    Csession = req.session;
    DB.sites.find({
        name: req.params.name
    })
        .then(r => {
            if (!r || !req.params.name)
                res.redirect("/article");
            else {
                const template = handlebars.compile(fs.readFileSync("./pages/discuss/discuss.html").toString());
                res.end(template({
                    name: req.params.name,
                    user: Csession.userID ? Csession.userID : "User" + Math.round(Math.random() * 100000)
                }));
            }
        })
        .catch(err => {
            throw err;
        });
});
