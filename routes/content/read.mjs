import { DB } from "../../resource/resource.mjs";
import app from "../../app/config.mjs";
import handlebars from "handlebars";
import fs from "fs";

let Csession;

// Read for client
app.get("/reader/:name", (req, res) => {
    Csession = req.session;
    // Check whether '/reader' has been provided with a 'name' parameter
    if (!req.params || !req.params.name)
        res.redirect("/article");
    DB.sites.findOne({
        name: req.params.name
    })
        .then(r => {
            let template = handlebars.compile(fs.readFileSync("./pages/article/read.html").toString());
            res.write(template({
                name: req.params.name,
                admin_button: `
                <button onclick='location.replace("/article/edit/${encodeURIComponent(r.name)}")' style="display: ${r.user === Csession.userID ? 'block' : 'none'};">Edit</button>
                <button style="display: ${r.user === Csession.userID ? 'block' : 'none'};" id="del">Delete</button>
                <button onclick='location.replace("/vote/${encodeURIComponent(r.name)}")' style="display: ${r.user === Csession.userID ? 'none' : 'block'};">Vote</button>
                `,
                content: r && r.content ? r.content : `This article have no content`,
                views: r.views,
                author: r.user,
                tag: r.tag,
                votes: r.votes
            }));
            if (r.user !== Csession.userID)
                return DB.sites.replaceOne(r, {
                    user: r.user,
                    name: r.name,
                    content: r.content,
                    display_img: r.display_img,
                    description: r.description,
                    views: r.views + 1,
                    tag: r.tag,
                    votes: r.votes
                });
        })
        .then(() => {
            res.end();
            return;
        })
        .catch(err => {
            throw err;
        });
});

// Vote
app.get("/vote/:name", (req, res) => {
    Csession = req.session;
    // Check whether '/vote' has been provided with a 'name' parameter
    if (!req.params || !req.params.name)
        res.redirect("/article");
    DB.sites.findOne({
        name: req.params.name
    })
        .then(r => {
            if (r.user !== Csession.userID) {
                return DB.sites.replaceOne(r, {
                    user: r.user,
                    name: r.name,
                    content: r.content,
                    display_img: r.display_img,
                    description: r.description,
                    views: r.views,
                    tag: r.tag,
                    votes: r.votes + 1
                });
            }
        })
        .then(r => {
            res.end(`<script>location.replace("/reader/${encodeURIComponent(req.params.name)}")</script>`);
            return;
        })
        .catch(err => {
            throw err;
        });
});