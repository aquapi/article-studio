import { url, settings, DB } from "../../resource/resource.mjs";
import app from "../../app/config.mjs";
import mongoose from "mongoose";
import handlebars from "handlebars";
import fs from "fs";
import Article from "../../models/article.mjs";

let Csession;

// Add article data to database

app.get("/process", (req, res) => {
    Csession = req.session;
    if (!Csession || !Csession.userID)
        res.redirect("/login");
    mongoose.connect(url, settings)
        .then(() => {
            return DB.sites.findOne({
                name: req.query.name
            });
        })
        .then(result => {
            // Check whether req.query.name is duplicated
            if (result) {
                res.end("Failed to create new article");
                res.redirect("/article/create");
            } else {
                let data = new Article({
                    user: Csession.userID ? Csession.userID : "None",
                    name: req.query.name,
                    content: '',
                    display_img: '',
                    description: req.query.description,
                    views: 0,
                    tag: req.query.tag,
                    votes: 0
                });
                data.save();
                res.end(
                    `\n<script>
                            location.replace("/article/edit/${encodeURIComponent(req.query.name)}");
                        </script>`
                );
            }
        })
        .catch(err => {
            throw err;
        });
});

// Edit articles
// https://localhost/article/edit

app.get("/article/edit/:name", (req, res) => {
    Csession = req.session;
    if (!Csession || !Csession.userID)
        res.redirect("/login");
    mongoose.connect(url, settings)
        .then(() => {
            return DB.sites.findOne({
                name: req.params.name ? req.params.name : ""
            });
        })
        .then(r => {
            if (r && r.user == Csession.userID) {
                let compileOBJ = {
                    name: req.params.name,
                    image_url: r && r.display_img && r.display_img !== "undefined" ? r.display_img : "Display image url",
                    md_content: r.content.split("<style>body {font-family: Corbel}</style>")[0]
                };

                let template = handlebars.compile(fs.readFileSync("./pages/edit/edit.html").toString());
                res.write(template(compileOBJ));
            } else
                res.redirect("/login");
            res.end();
        })
        .catch(err => {
            throw err;
        })
});

// Save changes of articles

app.post("/article/save", (req, res) => {
    // Check whether the user is logged in
    Csession = req.session;
    if (!Csession || !Csession.userID)
        res.redirect("/login");
    mongoose.connect(url, settings)
        .then(() => {
            return DB.sites.findOne({
                name: req.body.name ? req.body.name : ""
            });
        })
        .then(r => {
            if (r && r.user && Csession.userID === r.user) {
                return DB.sites.replaceOne(r,
                    {
                        user: r.user,
                        name: req.body.name,
                        content: req.body.content,
                        display_img: req.body.display_img && req.body.display_img !== "Display image url" ? req.body.display_img : "",
                        description: r.description,
                        views: r.views,
                        tag: r.tag ? r.tag : "",
                        votes: r.votes
                    }
                );
            } else {
                res.redirect("/login");
            }
        })
        .then(_v => {
            res.end(`<script>
            location.replace('/article/edit/${encodeURIComponent(req.body.name)}');
        </script>`);
        })
        .catch(err => {
            throw err;
        });
})

// Create articles
// https://localhost/article/new

app.get("/article/new", (req, res) => {
    // Check whether the user is logged in
    Csession = req.session;
    if (!Csession || !Csession.userID)
        res.redirect("/login");
    fs.readFile("./pages/article/create.html", (err, data) => {
        if (err) throw err;
        res.write(data);
        return res.end();
    });
});