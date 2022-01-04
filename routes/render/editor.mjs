import app from "../../app/loaders/express.mjs";
import { next } from "../../app/loaders/servers.mjs";
import Article from "../../models/article.mjs";

// Edit articles
// https://localhost/article/edit
app.get("/article/edit/:name", async (req, res) => {
    const r = await Article.findOne({
        name: req.params?.name ?? ""
    });
    if (r?.user == req.session?.userID) 
        return next.render(req, res, "/edit/edit", {
            name: req.params?.name,
            image_url: r.display_img && r.display_img !== "undefined" ? r.display_img : "Display image url",
            md_content: r.content.slice(308)
        });
    else
        res.redirect("/login");
});

// Create articles
// https://localhost/article/new
app.get("/article/new", (req, res) => 
    req.session?.userID ? next.render(req, res, "/article/create") : res.redirect("/article")
);