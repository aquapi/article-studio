import app from "../../loaders/express.mjs";
import next from "../../loaders/next.mjs";

// Login page
// https://localhost/login

app.get("/login",
	async (req, res) =>
		req.session?.userID
			? res.redirect("/article")
			: next.render(req, res, "/views/login")
);

// Sign up page
// https://localhost/signup

app.get("/signup",
	async (req, res) =>
		req.session?.userID
			? res.redirect("/article")
			: next.render(req, res, "/views/signup")
);
