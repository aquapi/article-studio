import { DB } from "../../app/resource.mjs";
import app from "../../app/config.mjs";
import next from "../../app/next.mjs";
import Article from "../../models/article.mjs";

let Csession;

// Add article data to database

app.get("/process", async (req, res) => {
    Csession = req.session;
    if (!Csession?.userID)
        res.redirect("/login");
    /**
     * @type {string}
     */
    const result = await DB.sites.findOne({
        name: req.query?.name ?? ""
    });

    // Check whether req.query.name is duplicated or include §
    if (result) {
        res.contentType("text/html");
        res.write("<code>Some articles have the same name as yours, please choose another name</code>");
    } else if (req.query?.name?.includes("§")) {
        res.contentType("text/html");
        res.write("<code>Illegal character §, please choose another name</code>");
    } else if (req.query?.name && Csession.userID) {
        const data = new Article({
            user: Csession.userID ? Csession.userID : "None",
            name: req.query.name,
            content: '',
            display_img: '',
            description: req.query.description,
            views: 0,
            tag: req.query.tag,
            votes: 0
        });
        await data.save();
        res.redirect(`/article/edit/${encodeURIComponent(req.query.name)}`);
        return;
    } else {
        res.redirect("/login");
        return;
    }
    res.end("<script>setTimeout(() => location.replace('/article/new'), 2000)</script>");
});

// Edit articles
// https://localhost/article/edit

app.get("/article/edit/:name", async (req, res) => {
    const r = await DB.sites.findOne({
        name: req.params?.name ?? ""
    });
    if (r?.user == req.session?.userID) 
        return next.render(req, res, "/edit/edit", {
            name: req.params?.name,
            image_url: r.display_img && r.display_img !== "undefined" ? r.display_img : "Display image url",
            md_content: r.content.split("<style>body {font-family: Corbel}</style>")[0]
        });
    else
        res.redirect("/login");
});

// Save changes of articles

app.post("/article/save", async (req, res) => {
    // Check whether the user is logged in
    Csession = req.session;
    if (!Csession?.userID)
        res.redirect("/login");
    const r = await DB.sites.findOne({
        name: req.body?.name ?? ""
    })
    if (Csession.userID === r?.user) {
        await DB.sites.replaceOne(r,
            {
                user: r.user,
                name: req.body.name,
                content: req.body.content,
                display_img: req.body?.display_img !== "Display image url" ? req.body.display_img : "",
                description: r.description,
                views: r.views,
                tag: r.tag ?? "",
                votes: r.votes
            }
        );
        res.redirect(`/article/edit/${encodeURIComponent(req.body.name)}`);
    } else
        res.redirect("/login");
});

// Create articles
// https://localhost/article/new

app.get("/article/new", (req, res) => 
    req.session?.userID ? next.render(req, res, "/article/create") : res.redirect("/article")
);