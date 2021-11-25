import { url, DB, settings, transporter } from "../../resource/resource.mjs";
import app from "../../app/config.mjs";
import mongoose from "mongoose";
import User from "../../models/user.mjs";
import fs from "fs";

let Csession;
let CurrentUser;

// Login page
// https://localhost/login

app.get("/login", (req, res) => {
	// Check whether the user isn't logged in
	Csession = req.session;
	if (Csession && Csession.userID)
		res.redirect("/article");
	fs.readFile("./pages/account/login.html", (err, data) => {
		if (err) throw err;
		res.write(data);
		return res.end();
	});
});

// Sign up page
// https://localhost/signup

app.get("/signup", (req, res) => {
	// Check whether the user isn't logged in
	Csession = req.session;
	if (Csession && Csession.userID)
		res.redirect("/article");
	fs.readFile("./pages/account/signup.html", (err, data) => {
		if (err) throw err;
		res.write(data);
		return res.end();
	});
});

// login process
app.post("/loginprocess", (req, res) => {
	mongoose
		.connect(url, settings)
		.then(() => {
			return DB.users.findOne({
				username: req.body.name,
				password: req.body.pass,
			});
		})
		.then((r) => {
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
		})
		.catch((err) => {
			throw err;
		});
});

// sign up process
app.post("/signupprocess", (req, res) => {
	mongoose
		.connect(url, settings)
		.then(() => {
			return DB.users.findOne({
				username: req.body.name,
			});
		})
		.then(r => {
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

				let user = new User({
					username: req.body.name,
					password: req.body.pass,
				});
				user.save();
				Csession = req.session;
				Csession.userID = req.body.name;
				CurrentUser = req.body.name;
				res.end(`
                	<script>
                    	location.replace("/article"); 
                	</script>
            	`);
			} else {
				if (req.body.pass === r.password) {
					Csession = req.session;
					Csession.userID = req.body.name;
					res.redirect("/article");
				}
			}
		})
		.catch((err) => {
			throw err;
		});
});

// Log out
app.get("/logout", (req, res) => {
	req.session.destroy();
	CurrentUser = undefined;
	res.redirect("/article");
});

// Export the current user
export default CurrentUser;