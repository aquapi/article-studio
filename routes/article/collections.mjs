import {
	DB,
	InitCategory,
} from "../../resource/resource.mjs";
import next from "../../app/next.mjs";
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
	/**
	 * @type {{name: string, content: string, views: number, author: string, votes: number}[]}
	 */
	let article = [];
	for (let i of r) {
		article.push({
			views: i.views ?? 0,
			author: i.user,
			name: i.name,
			data: i
		});
	}
	// Init articles
	article = InitCategory("views", article);
	return next.render(req, res, "/article/article", {
        Csession: Csession,
        headerName: "My Article",
        articles: article
    });
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
	/**
	 * @type {{name: string, content: string, views: number, author: string, votes: number}[]}
	 */
	let article = [];
	for (let i of r) {
		if (i.user !== Csession.userID) {
			article.push({
				views: i.views ?? 0,
				author: i.user,
				name: i.name,
				data: i
			});
		}
	}

	// Init articles
	article = InitCategory("views", article);
	return next.render(req, res, "/article/article", {
        Csession: Csession,
        headerName: "Other Articles",
        articles: article
    });
});
