import app from "../../loaders/express.mjs";
import passport from "passport";
import User from "../../models/user.mjs";
import { config } from "dotenv";
import { createTransport } from "nodemailer";

// Load env
config();

// Sign up process
app.post("/signupprocess",
    async (req, res, next) => {
        const user = await User.findOne({
            username: req.body.name
        }).exec();
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
            // 200 OK
            res.writeHead(200);
        }
        // Assign session
        else if (req.body.pass === user.password) {
            req.session.userID = req.body.name;
            // 200 OK
            res.writeHead(200);
        }

        // Not success
        else {
            // 401 Unauthorized
            res.writeHead(401);
        }

        // Redirect to homepage if success
        res.end();
    }
);