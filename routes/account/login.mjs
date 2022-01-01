import app from "../../app/loaders/express.mjs";

import { next } from "../../app/loaders/servers.mjs";
import { remove } from "../../app/dependencies/Util.mjs";

// Login page
// https://localhost/login

app.get("/login", (req, res) =>
	req.session?.userID ? res.redirect("/article") : next.render(req, res, "/account/login")
);

// Sign up page
// https://localhost/signup

app.get("/signup", (req, res) =>
	req.session?.userID ? res.redirect("/article") : next.render(req, res, "/account/signup")
);

// Log out
app.get("/logout", async (req, res) => {
	await remove(req.session);
	CurrentUser = undefined;
	res.redirect("/article");
});
