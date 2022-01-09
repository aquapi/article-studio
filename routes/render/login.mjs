import app from "../../app/loaders/express.mjs";
import { next } from "../../app/loaders/servers.mjs";

// Login page
// https://localhost/login

app.get("/login",
	async (req, res) =>
		req.session?.userID
			? res.redirect("/article")
			: next.render(req, res, "/login")
);

// Sign up page
// https://localhost/signup

app.get("/signup",
	async (req, res) =>
		req.session?.userID
			? res.redirect("/article")
			: next.render(req, res, "/signup")
);
