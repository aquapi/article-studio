import Article from "../../models/article.mjs";
import next from "../../loaders/next.mjs";
import app from "../../loaders/express.mjs";
import sort from "../../utils/sort.mjs";

// My article subpage: Show all articles created not by others
// https://localhost/myarticle

app.get("/myarticle", async (req, res) =>
	// Render
	!req.session?.userID
		? res.redirect("/login")
		: next.render(req, res, "/article", {
			Csession: req.session,
			headerName: "My Article",
			articles: sort("views",
				await Article.find({
					user: req.session.userID
				}).exec()
			)
		})
);

// Other article subpage: Show all articles created by others
// https://localhost/otherarticle

app.get("/otherarticle", async (req, res) => 
	// Render
	!req.session?.userID
		? res.redirect("/login")
		: next.render(req, res, "/article", {
			Csession: req.session,
			headerName: "Other Article",
			articles: sort("views",
				await Article.find({
					user: { $ne: req.session.userID ?? "" }
				}).exec()
			)
		})
);
