import app from "../../app/loaders/express.mjs";
import Article from "../../models/article.mjs";

// Add article data to database
app.get("/process", async (req, res) => {
    if (!req.session?.userID)
        res.redirect("/login");
    /**
     * @type {string}
     */
    const result = await Article.findOne({
        name: req.query?.name ?? ""
    });

    // Check whether req.query.name is duplicated or include §
    if (result) {
        res.contentType("text/html");
        res.write("<code>Some articles have the same name as yours, please choose another name</code>");
    } else if (req.query?.name && req.session?.userID) {
        await new Article({
            user: req.session?.userID ?? "None",
            name: req.query.name,
            content: '',
            display_img: '',
            description: req.query.description,
            views: 0,
            tag: req.query.tag,
            votes: 0
        }).save();
        res.redirect(`/article/edit/${encodeURIComponent(req.query.name)}`);
        return;
    } else {
        res.redirect("/login");
        return;
    }
    res.end("<script>setTimeout(() => location.replace('/article/new'), 2000)</script>");
});


// Save changes of articles
app.post("/article/save", async (req, res) => {
    // Check whether the user is logged in
    if (!req.session?.userID)
        res.redirect("/login");
    const r = await Article.findOne({
        name: req.body?.name ?? ""
    })
    if (!r) {
        res.redirect("/article");
        return;
    }
    if (req.session?.userID === r.user) {
        await Article.replaceOne(r,
            {
                user: r.user,
                name: req.body?.name,
                content: req.body?.content,
                display_img: req.body?.display_img && req.body.display_img !== "Display image url" ? req.body.display_img : "",
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
