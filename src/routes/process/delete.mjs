import Article from "../../models/article.mjs";
import User from "../../models/user.mjs";

/**
 * @type {{path: string, method: string, handler: import("express").RequestHandler}[]}
 */
export default [
    // Delete an user
    {
        path: "/delete",
        method: "post",
        handler: async req =>
            req.session?.userID ?
                await Promise.all([
                    Article.deleteMany({
                        user: req.session.userID
                    }).exec(),
                    User.deleteOne({
                        username: req.session.userID
                    }).exec()
                ])
                : null
    },

    // Delete an article
    {
        path: "/article/delete",
        method: 'post',
        async handler(req, res) {
            await Article.deleteOne({
                user: req.session?.userID ?? "",
                name: req.body.name
            }).exec(),
                res.redirect("/article");
        }
    }
];
