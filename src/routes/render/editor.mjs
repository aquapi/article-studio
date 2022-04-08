import next from "../../loaders/next.mjs";
import Article from "../../models/article.mjs";

// Edit articles
export default [
    {
        path: "/article/edit/:name",
        method: "get",
        async handler(req, res) {
            // Get data
            const { display_img, content, user, private: prv, coAuthor } = await Article.findOne({
                name: req.params?.name ?? ""
            }).exec() ?? {};
            // Check whether the current user is the author
            return user === req.session?.userID
                || coAuthor.indexOf(req.session?.userID) > -1
                // Render the page
                ? next.render(req, res, "/views/edit", {
                    name: req.params?.name,
                    image_url: display_img
                        ? display_img
                        : "Display image url",
                    md_content: content ?? "",
                    isPrivate: prv,
                    isCoAuthor: coAuthor.indexOf(req.session?.userID) > -1
                })
                // Redirect to login page
                : res.redirect("/login");
        }
    },

    // Create articles
    {
        path: "/article/new",
        method: "get",
        handler: async (req, res) =>
            req.session?.userID
                ? next.render(req, res, "/views/create")
                : res.redirect("/article")
    }
]