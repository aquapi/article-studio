import app from "../../app/loaders/express.mjs";
import next from "../../app/loaders/next.mjs";
import Article from "../../app/models/article.mjs";

// Edit articles
// https://localhost/article/edit
app.get("/article/edit/:name", async (req, res) => {
    const r = await Article.findOne({
        name: req.params?.name ?? ""
    });
    if ((r?.user ?? "") === (req.session?.userID ?? "None"))
        return next.render(req, res, "/edit", {
            name: req.params?.name,
            image_url: r.display_img && r.display_img !== "undefined" 
                ? r.display_img 
                : "Display image url",
            md_content: r.content
        });
    else
        res.redirect("/login");
});

// Create articles
// https://localhost/article/new
app.get("/article/new",
    async (req, res) =>
        req.session?.userID
            ? next.render(req, res, "/create")
            : res.redirect("/article")
);