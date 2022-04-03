import app from "../../loaders/express.mjs";
import Article from "../../models/article.mjs";

// Add article data to database
app.post("/process", async (req, res) => {
    // Check whether user is logged in
    if (!req.session?.userID)
        res.redirect("/login");

    // Find matches article
    const r = await Article.findOne({
        name: req.body?.name ?? ""
    }).exec();

    // Check whether req.body.name is duplicated 
    if (r)
        // 403 Forbidden
        res.writeHead(403);
    // Check whether user is logged in
    else if (req.body.name) {
        // Create an article
        await new Article({
            user: req.session?.userID ?? "None",
            name: req.body.name,
            content: '',
            display_img: '',
            description: req.body.description,
            views: 0,
            tag: req.body.tag,
            votes: 0,
            private: false,
            coAuthor: []
        }).save();
        // 200 OK
        res.writeHead(200);
    }
    // End the response
    res.end();
});

// Save changes of articles
app.post("/article/save", async (req, res) => {
    // Check whether the user is logged in
    if (!req.session?.userID)
        res.redirect("/login");
    // Find the article with corresponding user
    const r = await Article.findOne({
        name: req.body?.name ?? "",
    }).exec();
    // Check whether user is the author or co-author
    if (r.user !== req.session?.userID && r.coAuthor.indexOf(req.session?.userID) < 0) {
        // 401 Unauthorized
        res.writeHead(401);
        // End the request
        res.end();
        // End the function
        return;
    }
    // Save the changes
    await Article.replaceOne(r, {
        user: r.user,
        name: req.body.name,
        content: req.body?.content ?? "",
        display_img: req.body?.display_img && req.body.display_img !== "Display image url" ? req.body.display_img : "",
        description: r.description,
        views: r.views,
        tag: r.tag ?? "",
        votes: r.votes,
        private: req.body?.private ?? (r.private ?? false),
        coAuthor: req.body?.coAuthor ?? (r.coAuthor ?? [])
    }).exec();
    // 200 OK
    res.writeHead(200);
    // End the response
    res.end();
});
