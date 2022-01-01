import app from "../../app/loaders/express.mjs";
import Article from "../../models/article.mjs";

// Vote
app.get("/vote/:name", async (req, res) => {
    const r = await Article.findOne({
        name: req.params?.name ?? ""
    });
    if (!r) {
        res.redirect("/article");
        return;
    }
    // If another user votes
    if (r?.user !== req.session?.userID) {
        await Article.replaceOne(r, {
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
    res.redirect(`/reader/${encodeURIComponent(req.params.name)}`);
});