import {
	url,
	settings,
	DB,
	ArticleTemplate,
	ScriptTemplate,
	InitCategory,
	Header,
	EndScript,
	InitLoginScreen,
	SortByComponent
} from "../../resource/resource.mjs";
import mongoose from "mongoose";
import fs from "fs";
import app from "../../app/config.mjs";

let Csession;
// My article subpage: Show all articles created not by others
// https://localhost/myarticle

app.get("/myarticle", (req, res) => {
	// Check whether the user is logged in
	Csession = req.session;
	if (!Csession.userID)
		res.redirect("/login");
	// Init webpage
	res.write(fs.readFileSync("./pages/article/article.html"));
	// add created article with name matched to webpage 
	mongoose.connect(url, settings)
		.then(() => {
			return DB.sites.find({
				user: Csession.userID
			});
		})
		.then(r => {
			let script = "";
			let article = [];
			res.write(SortByComponent(true));
			res.write(Header("My Articles"));
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
			InitCategory("views", res, article);
			res.write("</div>");

			// Load javascript in webpage
			InitLoginScreen(res, Csession);
			res.write(`<script>${script}</script>`)
			// Check if no article found
			if (length === 0) {
				res.write(`<script>
                    location.replace("/article")
                </script>`)
			}
			res.end(EndScript(Csession, "My Articles"));
		})
		.catch(err => {
			throw err;
		});
});

// Other article subpage: Show all articles created by others
// https://localhost/otherarticle

app.get("/otherarticle", (req, res) => {
	// Check whether the user is logged in
	Csession = req.session;
	if (!Csession.userID)
		res.redirect("/login");
	// Init webpage
	res.write(fs.readFileSync("./pages/article/article.html"));
	// add created article with name matched to webpage
	mongoose.connect(url, settings)
		.then(() => {
			return DB.sites.find({});
		})
		.then(r => {
			let script = "";
			let article = [];
			res.write(SortByComponent(true));
			res.write(Header("Other Articles"));
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
				`)
			}
			const length = article.length;
			// Init articles
			InitCategory("views", res, article);
			res.write("</div>");

			// Load javascript in webpage
			InitLoginScreen(res, Csession);
			res.write(`<script>${script}</script>`);
			// Check if no article found
			if (length === 0) {
				res.write(`<script>
                    location.replace("/article")
                </script>`)
			}
			res.end(EndScript(Csession, "Other Articles"));
		})
		.catch(err => {
			throw err;
		});
});
