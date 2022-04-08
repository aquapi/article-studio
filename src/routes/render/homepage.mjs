import Article from "../../models/article.mjs";
import next from "../../loaders/next.mjs";
import sort from "../../utils/sort.mjs";
import filter from "../../utils/filter.mjs";

// Homepage
// https://localhost/article

export default [
    {
        path: "/article",
        method: "get",
        handler: async (req, res) =>
            // Render
            next.render(req, res, "/views/article", {
                Csession: req.session,
                headerName: "Discover",
                articles: filter(
                    sort("views", await Article.find({}).exec())
                )
            })
    },

    // Most Vote
    {
        path: "/mostvote",
        method: "get",
        handler: async (req, res) =>
            // Render
            next.render(req, res, "/views/article", {
                Csession: req.session,
                headerName: "Most Voted",
                articles: filter(
                    sort("votes", await Article.find({}).exec())
                )
            })
    }
];