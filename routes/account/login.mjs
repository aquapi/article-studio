import { DB, transporter } from "../../resource/resource.mjs";
import app from "../../app/config.mjs";
import User from "../../models/user.mjs";
import { next } from "../../app/next.mjs";

let Csession;
let CurrentUser;

// Login page
// https://localhost/login

app.get("/login", (req, res) => {
	// Check whether the user isn't logged in
	Csession = req.session;
	if (Csession && Csession.userID)
		res.redirect("/article");
	return next.render(req, res, "/account/login");
});

// Sign up page
// https://localhost/signup

app.get("/signup", (req, res) => {
	// Check whether the user isn't logged in
	Csession = req.session;
	if (Csession && Csession.userID)
		res.redirect("/article");
	return next.render(req, res, "/account/signup");
});

// login process
app.post("/loginprocess", async (req, res) => {
	const r = await DB.users.findOne({
		username: req.body.name,
		password: req.body.pass,
	});
	res.contentType("html");
	if (!r)
		res.write(`
            <code>Incorrect username or password, try again</code>
            <script>
                setTimeout(() => {
                    location.replace("/login");
                }, 3000);
        	</script>
        `);
	else {
		Csession = req.session;
		Csession.userID = req.body.name;
		CurrentUser = req.body.name;
		res.redirect("/article");
	}
	res.end();
});

// sign up process
app.post("/signupprocess", async (req, res) => {
	const r = await DB.users.findOne({
		username: req.body.name,
	});
	if (!r) {
		transporter.sendMail({
			from: 'aquaplmc@gmail.com',
			to: req.body.email,
			subject: 'Your username and password',
			text: `
				Username: ${req.body.name}
				Password: ${req.body.pass}
				If you didn't sign up on our site, just ignore or delete this mail
				Send feedback to our site: Userfeedbackrespond@gmail.com
			`
		}, err => {
			if (err) throw err;
		});

		const user = new User({
			username: req.body.name,
			password: req.body.pass,
		});
		await user.save();
		Csession = req.session;
		Csession.userID = req.body.name;
		CurrentUser = req.body.name;
	} else if (req.body.pass === r.password) {
		Csession = req.session;
		Csession.userID = req.body.name;
	}
	res.redirect("/article");
});

// Log out
app.get("/logout", (req, res) => {
	req.session.destroy();
	CurrentUser = undefined;
	res.redirect("/article");
});

// Export the current user
export default CurrentUser;