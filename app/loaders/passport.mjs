import passport from "passport";
import User from "../../models/user.mjs";
import { Strategy as LocalStrategy } from "passport-local";
import { config } from "dotenv";
import { createTransport } from "nodemailer";

// Load env
config();

// Strategies
passport.use(new LocalStrategy(
    async (username, _, cb) =>
        cb(null, await User.findOne({
            username,
        }) ?? false)
));

// Middleware
export default {
    // Login process
    login: (req, res, next) =>
        passport.authenticate("local", { session: false },
            (err, user) => {
                // Check whether errors occur
                if (err) 
                    next(err);
                // Check whether user not found
                if (!user || req.body.password !== user.password) {
                    res.redirect("/login");
                    return;
                }
                
                // Assign session when success
                req.session.userID = user.username;
                res.redirect("/article");
            }
        )(req, res, next),
    // Signup
    signup: (req, res, next) => 
        passport.authenticate("local", { session: false },
            async (err, user) => {
                if (err) next(err);
                if (!user) {
                    // Create a transporter
                    const transporter = createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.PASSWORD
                        }
                    });

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

                    // Assign session
                    req.session.userID = req.body.name;
                }
                // Assign session
                else if (req.body.pass === user.password) 
                    req.session.userID = req.body.name;
                
                // Redirect to homepage if success
                res.redirect("/article");
            }
        )(req, res, next)
}
