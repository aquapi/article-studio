// Log out
/**
 * @type {{path: string, method: string, handler: import("express").RequestHandler}}
 */
export default {
	path: "/logout",
	method: "get",
	handler(req, res) {
		req.session.destroy();
		res.redirect("/article");
	}
}
	;
