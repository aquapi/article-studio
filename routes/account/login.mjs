import { DB, transporter } from "../../app/resource.mjs";
import app from "../../app/servers/express.mjs";
import User from "../../models/user.mjs";
import { next } from "../../app/servers/servers.mjs";
import { createMailSender, remove } from "../../app/dependencies/Util.mjs";
import auth from "../../app/servers/passport.mjs";

// Send mail
const sendMail = createMailSender(transporter);

/**
 * @type {string}
 */
let CurrentUser;

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

// login process
app.post("/loginprocess", auth.login, async (req, res) => {
	const r = req.user;
	req.session.userID = CurrentUser = r.username
	res.redirect("/article");
	res.end();
});

// sign up process
app.post("/signupprocess", async (req, res) => {
	const r = await DB.users.findOne({
		username: req.body.name,
	});
	if (!r)
		await Promise.all([
			sendMail({
				from: 'aquaplmc@gmail.com',
				to: req.body.email,
				subject: 'Your username and password',
				text: `
					Username: ${req.body.name}
					Password: ${req.body.pass}
					If you didn't sign up on our site, just ignore or delete this mail
					Send feedback to our site: Userfeedbackrespond@gmail.com
				`
			}),
			new User({
				username: req.body.name,
				password: req.body.pass,
			}).save()
		]);
	if (!r || req.body.pass === r.password) {
		req.session.userID = req.body.name;
		CurrentUser = req.body.name;
	}
	res.redirect("/article");
});

// Log out
app.get("/logout", async (req, res) => {
	await remove(req.session);
	CurrentUser = undefined;
	res.redirect("/article");
});

// Export the current user
export default CurrentUser;