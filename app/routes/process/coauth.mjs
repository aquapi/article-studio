import app from "../../loaders/express.mjs";
import Article from "../../models/article.mjs";

app.post("/coauths/save/:name", async (req, res) => {
    const r = await Article.findOne({
        name: req.params?.name ?? ""
    });

    // Check whether user is the author
    if (r.user === req.session?.userID) {
        const query = await Article.replaceOne(r, {
            user: r.user,
            name: r.name,
            content: r.content,
            display_img: r.display_img,
            description: r.description,
            views: r.views,
            tag: r.tag,
            votes: r.votes,
            private: r.private,
            coAuthor: req.body?.coAuthor ?? (r.coAuthor ?? []),
        }).exec();
        res.writeHead(200);
    }
    // Else reject
    else
        res.writeHead(403);
    // End the response
    res.end();
});