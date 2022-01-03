import app from "../../app/loaders/express.mjs";

// Log out
app.get("/logout", (req, res) => {
	req.session.destroy();
	res.redirect("/article");
});
