import Article from "../../models/article.mjs";
import next from "../../loaders/next.mjs";
import app from "../../loaders/express.mjs";
import sort from "../../utils/sort.mjs";
import filter from "../../utils/filter.mjs";

// Homepage
// https://localhost/article

app.get("/article", async (req, res) => 
    // Render
    next.render(req, res, "/views/article", {
        Csession: req.session,
        headerName: "Discover",
        articles: filter(
            sort("views", await Article.find({}).exec())
        )
    })
);

// Most Vote
// https://localhost/mostvote

app.get("/mostvote", async (req, res) => 
    // Render
    next.render(req, res, "/views/article", {
        Csession: req.session, 
        headerName: "Most Voted",
        articles: filter(
            sort("votes", await Article.find({}).exec())
        )
    })
);