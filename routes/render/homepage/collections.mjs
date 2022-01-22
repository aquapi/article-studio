import Article from "../../../models/article.mjs";
import { next } from "../../../app/loaders/servers.mjs";
import app from "../../../app/loaders/express.mjs";
import sort from "./sort.mjs";

// My article subpage: Show all articles created not by others
// https://localhost/myarticle

app.get("/myarticle", async (req, res) => {
	// Search all articles which belongs to current user
	const r = await Article.find({
		user: req.session.userID
	});
	// Check whether no article found
	if (r.length === 0)
		res.redirect('/article');
	// Check whether the user is logged in
	else if (!req.session?.userID)
		res.redirect("/login");
	/**
	 * @type {{name: string, content: string, views: number, author: string, votes: number}[]}
	 */
	let article = [];
	for (let i of r)
		article.push({
			views: i.views ?? 0,
			author: i.user,
			name: i.name,
			tag: i.tag,
            description: i.description,
            display_img: i.display_img
		});
	// Init articles
	article = sort("views", article);
	// Render
	return next.render(req, res, "/article", {
		Csession: req.session,
		headerName: "My Article",
		articles: article
	});
});

// Other article subpage: Show all articles created by others
// https://localhost/otherarticle

app.get("/otherarticle", async (req, res) => {
	// Search all articles which belongs to current user
	const r = await Article.find({
		user: { $ne: req.session?.userID ?? "" }
	});
	// Check whether no article found
	if (r.length === 0)
		res.redirect('/article');
	// Check whether the user is logged in
	else if (!req.session?.userID)
		res.redirect("/login");
	/**
	 * @type {{name: string, content: string, views: number, author: string, votes: number}[]}
	 */
	let article = [];
	for (let i of r)
		article.push({
			views: i.views ?? 0,
			author: i.user,
			name: i.name,
			tag: i.tag,
            description: i.description,
            display_img: i.display_img
		});

	// Init articles
	article = sort("views", article);
	// Render
	return next.render(req, res, "/article", {
		Csession: req.session,
		headerName: "Other Articles",
		articles: article
	});
});
