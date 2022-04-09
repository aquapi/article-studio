import next from "../../loaders/next.mjs";
import Article from "../../models/article.mjs";

/**
 * @type {{path: string, method: string, handler: import("express").RequestHandler}}
 */
export default {
    path: "/coauths/:name",
    method: "get",
    async handler(req, res) {
        // FInd the article
        const r = await Article.findOne({
            name: req.params?.name ?? ""
        });
        // If user is an author
        if (r.user === req.session?.userID)
            return next.render(req, res, "/views/coauth", {
                name: r.name,
                coAuthors: r.coAuthor ?? []
            });
        // If the user is not the author
        res.redirect("/login");
    }
};