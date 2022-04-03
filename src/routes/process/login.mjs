import app from "../../loaders/express.mjs";
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
                if (!user || req.body.password !== user.password)
                    // 401 Unauthorized
                    res.writeHead(401);
                else {
                    // Assign session when success
                    req.session.userID = user.username;
                    // 200 OK
                    res.writeHead(200);
                }
                // End the response
                res.end();
            }
        )(req, res, next)
);
