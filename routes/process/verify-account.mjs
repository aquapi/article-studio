import User from "../../models/user.mjs";
import auth from "../../app/loaders/passport.mjs";
import app from "../../app/loaders/express.mjs";
import { transporter } from "../../app/resource.mjs";

// login process
app.post("/loginprocess", auth.login, async (req, res) => {
    const r = req.user;
    req.session.userID = r.username;
    res.redirect("/article");
    res.end();
});

// sign up process
app.post("/signupprocess", async (req, res) => {
    const r = await User.findOne({
        username: req.body.name,
    });
    if (!r) {
        // Send mail to user
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
        });

        // Create new user and save to database
        await new User({
            username: req.body.name,
            password: req.body.pass,
        }).save();
    }

    // Assign session
    if (!r || req.body.pass === r.password)
        req.session.userID = req.body.name;
    
    // Redirect to homepage if success
    res.redirect("/article");
});