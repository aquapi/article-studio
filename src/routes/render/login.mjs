import next from "../../loaders/next.mjs";

export default [
	// Login page
	{
		path: "/login",
		method: "get",
		handler: async (req, res) =>
			req.session?.userID
				? res.redirect("/article")
				: next.render(req, res, "/views/login")
	},

	// Sign up page
	{
		path: "/signup",
		method: "get",
		handler: async (req, res) =>
			req.session?.userID
				? res.redirect("/article")
				: next.render(req, res, "/views/signup")
	}
];