import {
	DB,
	ArticleTemplate,
	ScriptTemplate,
	InitCategory,
	Header,
	SortByComponent
} from "../../resource/resource.mjs";
import fs from "fs";
import app from "../../app/config.mjs";

let Csession;
// My article subpage: Show all articles created not by others
// https://localhost/myarticle

app.get("/myarticle", async (req, res) => {
	// Check whether the user is logged in
	Csession = req.session;
	if (!Csession.userID)
		res.redirect("/login");
	// Init webpage
	res.write(fs.readFileSync("./pages/article/article.html"));
	// Search all articles which belongs to current user
	const r = await DB.sites.find({
		user: Csession.userID
	});
	let script = "";
	/**
	 * @type {{content: string, views: number, author: string, votes: number}[]}
	 */
	let article = [];
	// Init hidden data
	res.write(`
        <span style="display: none">${Csession.userID}</span>
        <span style="display: none">My Articles</span>
    `)
	// All lists of articles
	res.write(SortByComponent(true));
	// Header
	res.write(Header("My Articles"));
	// Articles
	res.write("<div style='display: none; overflow-x: scroll; overflow-y: hidden, max-height: 504px' id='created-article'>");
	for (let i of r) {
		article.push({
			content: ArticleTemplate(i),
			views: i.views ? i.views : 0,
			author: i.user
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
	const length = article.length;
	// Init articles
	article = InitCategory("views", article);
	for (let atc of article)
		res.write(atc.content);
	// Close the created article div
	res.write("</div>");

	// Load javascript in webpage
	res.write(`<script src="/javascripts/homepage/navbuttons.js"></script>`);
	res.write(`<script>${script}</script>`)
	// Check if no article found
	if (length === 0) {
		res.write(`<script>
            location.replace("/article")
        </script>`)
	}
	res.end('<script src="/javascripts/homepage/endscript.js"></script>');
});

// Other article subpage: Show all articles created by others
// https://localhost/otherarticle

app.get("/otherarticle", async (req, res) => {
	// Check whether the user is logged in
	Csession = req.session;
	if (!Csession.userID)
		res.redirect("/login");
	// Init webpage
	res.write(fs.readFileSync("./pages/article/article.html"));
	// Search all articles
	const r = await DB.sites.find({});
	let script = "";
	/**
	 * @type {{content: string, views: number, author: string, votes: number}[]}
	 */
	let article = [];
	// Init hidden data
	res.write(`
        <span style="display: none">${Csession.userID}</span>
        <span style="display: none">Other Articles</span>
    `)
	// All lists of articles
	res.write(SortByComponent(true));
	// Header
	res.write(Header("Other Articles"));
	// Articles
	res.write("<div style='display: none; overflow-x: scroll; overflow-y: hidden, max-height: 504px' id='created-article'>");
	for (let i of r) {
		if (i.user !== Csession.userID) {
			article.push({
				content: ArticleTemplate(i),
				views: i.views ? i.views : 0,
				author: i.user
			});
			script += ScriptTemplate(i);
		}
	}
	// Check whether article number is larger than 4
	if (article.length > 4) {
		res.write(`
			<script>
				document.querySelector("#created-article").style["justify-content"] = "flex-start";
			</script>
		`);
	}
	const length = article.length;
	// Init articles
	article = InitCategory("views", article);
	for (let atc of article)
		res.write(atc.content);
	// Close created article div
	res.write("</div>");

	// Load javascript in webpage
	res.write(`<script src="/javascripts/homepage/navbuttons.js"></script>`);
	res.write(`<script>${script}</script>`);
	// Check if no article found
	if (length === 0) {
		res.write(`<script>
            location.replace("/article")
        </script>`)
	}
	res.end('<script src="/javascripts/homepage/endscript.js"></script>');
});
