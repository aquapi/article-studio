import Article from "../../app/models/article.mjs";
import next from "../../app/loaders/next.mjs";
import app from "../../app/loaders/express.mjs";
import sort from "../../app/util/sort.mjs";

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