import app from "../../loaders/express.mjs";

// Log out
app.get("/logout",
	(req, res) => {
		req.session.destroy();
		res.redirect("/article");
	}
);
