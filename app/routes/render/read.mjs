import app from "../../loaders/express.mjs";
import next from "../../loaders/next.mjs";
import Article from "../../models/article.mjs";

// Read for client
app.get("/reader/:name", async (req, res) => {
    let userID = req.session?.userID ?? "";
    const r = await Article.findOne({
        name: req.params?.name ?? ""
    }).exec();
    // If reader can't find target article
    if (!r) {
        res.redirect("/article");
        return;
    }
    // If another user visits the read site 
    if (r.user !== userID)
        await Article.replaceOne(r, {
            user: r.user,
            name: r.name,
            content: r.content,
            display_img: r.display_img,
            description: r.description,
            views: r.views + 1,
            tag: r.tag,
            votes: r.votes
        });
    // Render
    return next.render(req, res, "/views/read", {
        name: req.params.name,
        admin_button: `
            <button onclick='location.replace("/article/edit/${encodeURIComponent(r.name)}")' style="display: ${r.user === userID ? 'block' : 'none'};">Edit</button>
            <button style="display: ${r.user === userID ? 'block' : 'none'};" id="del">Delete</button>
            <button onclick='vote()' style="display: ${r.user === userID ? 'none' : 'block'};">Vote</button>
        `,
        content: r.content ?? `This article have no content`,
        views: r.views,
        author: r.user,
        tag: r.tag,
        votes: r.votes,
        user: req.session?.userID ?? ""
    });
});
