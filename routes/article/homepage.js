import {
    url,
    settings,
    DB,
    ArticleTemplate,
    ScriptTemplate,
    Header,
    InitCategory,
    EndScript,
    InitLoginScreen,
    SortByComponent
} from "../../resource/resource.js";
import app from "../../app/config.js";
import mongoose from "mongoose";
import fs from "fs";

let Csession;
// Homepage
// https://localhost/article

app.get("/article", (req, res) => {
    // Init webpage
    Csession = req.session;
    res.write(fs.readFileSync("./views/article/article.html").toString().trim().replace(/\<\/html\>/, "").replace(/\<\/body\>/, ""));
    // add created article with name matched to webpage
    mongoose.connect(url, settings)
        .then(() => {
            return DB.sites.find({});
        })
        .then(r => {
            let script = "";
            let article = [];
            res.write(SortByComponent(!!Csession.userID))
            res.write(Header("Discover"));
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
            InitCategory("views", res, article);
            res.write("</div>");

            // Load javascript in webpage
            InitLoginScreen(res, Csession);
            res.write(`<script>${script}</script>`);
            res.end(EndScript(Csession, "Discover"));
        })
        .catch(err => {
            throw err;
        });
});

// Most Vote
// https://localhost/mostvote

app.get("/mostvote", (req, res) => {
    // Init webpage
    Csession = req.session;
    res.write(fs.readFileSync("./views/article/article.html").toString().trim().replace(/\<\/html\>/, "").replace(/\<\/body\>/, ""));
    // add created article with name matched to webpage
    mongoose.connect(url, settings)
        .then(() => {
            return DB.sites.find({});
        })
        .then(r => {
            let script = "";
            let article = [];
            res.write(SortByComponent(!!Csession.userID))
            res.write(Header("Most Voted"));
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
            InitCategory("votes", res, article);
            res.write("</div>");

            // Load javascript in webpage
            InitLoginScreen(res, Csession);
            res.write(`<script>${script}</script>`);
            res.end(EndScript(Csession, "Most Voted"));
        })
        .catch(err => {
            throw err;
        });
})