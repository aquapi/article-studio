import Article from "../../models/article.mjs";
import User from "../../models/user.mjs";

/**
 * @param {string[]} list 
 */
async function check(list) {
    for (const i of list) {
        if (
            !await User.findOne({
                username: i
            })
        )
            return false;
    }
    return true;
}

export default {
    path: "/coauths/save/:name",
    method: "post",
    async handler(req, res) {
        const r = await Article.findOne({
            name: req.params?.name ?? ""
        });

        // Check whether user is the author
        if (
            r.user === req.session?.userID
            && await check(req.body?.coAuthor)
        ) {
            await Article.replaceOne(r, {
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
    }
};