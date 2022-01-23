import Article from "../../models/article.mjs";
import next from "../../loaders/next.mjs";
import app from "../../loaders/express.mjs";
import sort from "../../utils/sort.mjs";

// Homepage
// https://localhost/article

app.get("/article", async (req, res) => 
    // Render
    next.render(req, res, "/article", {
        Csession: req.session,
        headerName: "Discover",
        articles: sort("views", await Article.find({}))
    })
);

// Most Vote
// https://localhost/mostvote

app.get("/mostvote", async (req, res) => 
    // Render
    next.render(req, res, "/article", {
        Csession: req.session, 
        headerName: "Most Voted",
        articles: sort("votes", await Article.find({}))
    })
);