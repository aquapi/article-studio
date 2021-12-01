import {
	DB,
	ArticleTemplate,
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
	Csession = req.session;
	// Search all articles which belongs to current user
	const r = await DB.sites.find({
		user: Csession.userID
	});
	// Check whether no article found
	if (r.length === 0)
		res.redirect('/article');
	// Check whether the user is logged in
	else if (!Csession.userID)
		res.redirect("/login");
	// Init webpage
	res.write(fs.readFileSync("./pages/article/article.html"));
	/**
	 * @type {{name: string, content: string, views: number, author: string, votes: number}[]}
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
	res.write("<div id='created-article'>");
	for (let i of r) {
		article.push({
			content: ArticleTemplate(i),
			views: i.views ?? 0,
			author: i.user,
			name: i.name,
			data: i
		});
	}
	// Init articles
	article = InitCategory("views", article);
	for (let atc of article)
		res.write(atc.content);
	// Close the created article div
	res.write("</div>");
	res.write(`
        <span style="display: none">${article.map(e => e.name)}}</span>
    `)
    // Load javascript in webpage
    res.write(`<script src="/javascripts/homepage/links.js"></script>`)
	res.write(`<script src="/javascripts/homepage/navbuttons.js"></script>`);
	res.end('<script src="/javascripts/homepage/endscript.js"></script>');
});

// Other article subpage: Show all articles created by others
// https://localhost/otherarticle

app.get("/otherarticle", async (req, res) => {
	Csession = req.session;
	// Search all articles which belongs to current user
	const r = await DB.sites.find({
		user: { $ne: Csession.userID }
	});
	// Check whether no article found
	if (r.length === 0)
		res.redirect('/article');
	// Check whether the user is logged in
	else if (!Csession.userID)
		res.redirect("/login");
	// Init webpage
	res.write(fs.readFileSync("./pages/article/article.html"));
	/**
	 * @type {{name: string, content: string, views: number, author: string, votes: number}[]}
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
	res.write("<div id='created-article'>");
	for (let i of r) {
		if (i.user !== Csession.userID) {
			article.push({
				content: ArticleTemplate(i),
				views: i.views ?? 0,
				author: i.user,
				name: i.name,
				data: i
			});
		}
	}

	// Init articles
	article = InitCategory("views", article);
	for (let atc of article)
		res.write(atc.content);
	// Close created article div
	res.write("</div>");
	res.write(`
        <span style="display: none">${article.map(e => e.name)}}</span>
    `)
    // Load javascript in webpage
    res.write(`<script src="/javascripts/homepage/links.js"></script>`)
	res.write(`<script src="/javascripts/homepage/navbuttons.js"></script>`);
	res.end('<script src="/javascripts/homepage/endscript.js"></script>');
});
