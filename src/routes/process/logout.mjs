// Log out
export default {
	path: "/logout",
	method: "get",
	handler(req, res) {
		req.session.destroy();
		res.redirect("/article");
	}
}
	;
