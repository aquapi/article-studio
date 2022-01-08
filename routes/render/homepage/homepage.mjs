import Article from "../../../models/article.mjs";
import { next } from "../../../app/loaders/servers.mjs";
import app from "../../../app/loaders/express.mjs";
import sort from "./sort.mjs";

// Homepage
// https://localhost/article

app.get("/article", async (req, res) => {
	// Search all articles which belongs to current user
	const r = await Article.find({});
    /**
     * @type {{name: string, content: string, views: number, author: string, votes: number}[]}
     */
    let article = [];
    // Created articles
    for (let i of r) 
        article.push({
            name: i.name,
            views: i.views ?? 0,
            author: i.user,
            votes: i.votes,
            data: i
        });
    // Sort articles
    article = sort("views", article);
    // Render
    return next.render(req, res, "/article", {
        Csession: req.session,
        headerName: "Discover",
        articles: article
    });
});

// Most Vote
// https://localhost/mostvote

app.get("/mostvote", async (req, res) => {
	// Search all articles which belongs to current user
	const r = await Article.find({});
    /**
     * @type {{content: string, views: number, author: string, votes: number}[]}
     */
    let article = [];
    // Add articles from database
    for (let i of r) 
        article.push({
            views: i.views ?? 0,
            author: i.user,
            votes: i.votes,
            name: i.name,
            data: i
        });

    // Init articles
    article = sort("votes", article);
    // Render
    return next.render(req, res, "/article", {
        Csession: req.session, 
        headerName: "Most Voted",
        articles: article
    });
});