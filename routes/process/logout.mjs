import app from "../../app/loaders/express.mjs";

// Log out
app.get("/logout", async (req, res) => {
    req.logout();
	req.session.destroy();
	res.redirect("/article");
});
