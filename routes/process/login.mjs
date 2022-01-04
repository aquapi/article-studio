import app from "../../app/loaders/express.mjs";
import passport from "passport";

app.post(
    "/loginprocess",
    // Login process
    (req, res, next) =>
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
        )(req, res, next)
);
