import {
    DB,
    InitCategory,
} from "../../app/resource.mjs";
import next from "../../app/servers/next.mjs";
import app from "../../app/config.mjs";

let Csession;
// Homepage
// https://localhost/article

app.get("/article", async (req, res) => {
    Csession = req.session;
	// Search all articles which belongs to current user
	const r = await DB.sites.find({});
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
    article = InitCategory("views", article);
    // Render
    return next.render(req, res, "/article/article", {
        Csession: Csession,
        headerName: "Discover",
        articles: article
    });
});

// Most Vote
// https://localhost/mostvote

app.get("/mostvote", async (req, res) => {
    Csession = req.session;
	// Search all articles which belongs to current user
	const r = await DB.sites.find({});
    /**
     * @type {{content: string, views: number, author: string, votes: number}[]}
     */
    let article = [];
    // Add articles from database
    for (let i of r) {
        article.push({
            views: i.views ?? 0,
            author: i.user,
            votes: i.votes,
            name: i.name,
            data: i
        });
    }

    // Init articles
    article = InitCategory("votes", article);
    return next.render(req, res, "/article/article", {
        Csession: Csession,
        headerName: "Most Voted",
        articles: article
    });
});