import {
    DB,
    ArticleTemplate,
    ScriptTemplate,
    Header,
    InitCategory,
    EndScript,
    InitLoginScreen,
    SortByComponent
} from "../../resource/resource.mjs";
import app from "../../app/config.mjs";
import fs from "fs";

let Csession;
// Homepage
// https://localhost/article

app.get("/article", async (req, res) => {
    // Init webpage
    Csession = req.session;
    res.write(fs.readFileSync("./pages/article/article.html").toString().trim().replace(/\<\/html\>/, "").replace(/\<\/body\>/, ""));
    // Find all articles
    const r = await DB.sites.find({});
    let script = "";
    /**
     * @type {{content: string, views: number, author: string, votes: number}[]}
     */
    let article = [];
    // All lists of articles link
    res.write(SortByComponent(!!Csession.userID));
    // Header
    res.write(Header("Discover"));
    // Created articles
    res.write("<div style='display: none; overflow-x: scroll; overflow-y: hidden, max-height: 504px' id='created-article'>");
    for (let i of r) {
        article.push({
            content: ArticleTemplate(i),
            views: i.views ? i.views : 0,
            author: i.user,
            votes: i.votes
        });
        script += ScriptTemplate(i);
    }
    // Check whether article number is larger than 4
    if (article.length > 4) {
        res.write(`
			<script>
				document.querySelector("#created-article").style["justify-content"] = "flex-start";
			</script>
		`)
    }

    // Init articles
    article = InitCategory("views", article);
    for (let atc of article)
        res.write(atc.content);
    // Close created article div
    res.write("</div>");

    // Load javascript in webpage
    res.write(InitLoginScreen(Csession));
    res.write(`<script>${script}</script>`);
    res.end(EndScript(Csession, "Discover"));
});

// Most Vote
// https://localhost/mostvote

app.get("/mostvote", async (req, res) => {
    // Init webpage
    Csession = req.session;
    res.write(fs.readFileSync("./pages/article/article.html").toString().trim().replace(/\<\/html\>/, "").replace(/\<\/body\>/, ""));
    // Search all articles
    const r = await DB.sites.find({});
    let script = "";
    /**
     * @type {{content: string, views: number, author: string, votes: number}[]}
     */
    let article = [];
    // All lists of articles link
    res.write(SortByComponent(!!Csession.userID))
    // Header
    res.write(Header("Most Voted"));
    // Created article
    res.write("<div style='display: none; overflow-x: scroll; overflow-y: hidden, max-height: 504px' id='created-article'>");
    // Add articles from database
    for (let i of r) {
        article.push({
            content: ArticleTemplate(i),
            views: i.views ? i.views : 0,
            author: i.user,
            votes: i.votes
        });
        script += ScriptTemplate(i);
    }
    // Check whether article number is larger than 4
    if (article.length > 4) {
        res.write(`
			<script>
				document.querySelector("#created-article").style["justify-content"] = "flex-start";
			</script>
		`);
    }

    // Init articles
    article = InitCategory("votes", article);
    for (let atc of article)
        res.write(atc.content);
    // End of articles block
    res.write("</div>");

    // Load javascript in webpage
    res.write(InitLoginScreen(Csession));
    // All scripts
    res.write(`<script>${script}</script>`);
    // End scripts
    res.end(EndScript(Csession, "Most Voted"));
});