import next from "../../loaders/next.mjs";
import Article from "../../models/article.mjs";

// Read for client
export default {
    path: "/reader/:name",
    method: "get",
    async handler(req, res) {
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
        if (r.user !== userID || r.coAuthor.indexOf(userID) > -1)
            await Article.replaceOne(r, {
                user: r.user,
                name: r.name,
                content: r.content,
                display_img: r.display_img,
                description: r.description,
                views: r.views + 1,
                tag: r.tag,
                votes: r.votes,
                private: r.private ?? false,
                coAuthor: r.coAuthor
            });
        // Render
        return next.render(req, res, "/views/read", {
            name: req.params.name,
            content: r.content ?? `This article have no content`,
            views: r.views,
            author: r.user,
            tag: r.tag,
            votes: r.votes,
            user: req.session?.userID ?? "",
            coAuthor: r.coAuthor
        });
    }
};
