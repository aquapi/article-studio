import app from "../../app/loaders/express.mjs";
import Article from "../../app/models/article.mjs";

// Add article data to database
app.get("/process", async (req, res) => {
    if (!req.session?.userID)
        res.redirect("/login");
    /**
     * @type {string}
     * 
     * Find the matching article
     */
    const result = await Article.findOne({
        name: req.query?.name ?? ""
    });

    // Check whether req.query.name is duplicated 
    if (result) {
        res.contentType("text/html");
        res.write("<code>Some articles have the same name as yours, please choose another name</code>");
        res.end("<script>setTimeout(() => location.replace('/article/new'), 2000)</script>");
    } 
    // Check whether user is logged in
    else if (req.query?.name && req.session?.userID) {
        // Create an article
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
        // Redirect to edit page
        res.redirect(`/article/edit/${encodeURIComponent(req.query.name)}`);
    } 
    // Redirect back to log in
    else 
        res.redirect("/login");
});


// Save changes of articles
app.post("/article/save", async (req, res) => {
    // Check whether the user is logged in
    if (!req.session?.userID)
        res.redirect("/login");
    // Find the article with corresponding user
    const r = await Article.findOne({
        name: req.body?.name ?? "",
        user: req.session?.userID ?? ""
    });
    // Check whether the target article is found
    if (!r) {
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
        name: req.body?.name,
        content: req.body?.content,
        display_img: req.body?.display_img && req.body.display_img !== "Display image url" ? req.body.display_img : "",
        description: r.description,
        views: r.views,
        tag: r.tag ?? "",
        votes: r.votes
    });
    // 200 OK
    res.writeHead(200);
    // End the response
    res.end();
});
