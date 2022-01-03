import passport from "passport";
import User from "../../models/user.mjs";
import { Strategy as LocalStrategy } from "passport-local";

// Strategies
passport.use(new LocalStrategy(
    async (username, password, cb) =>
        cb(null, await User.findOne({
            username,
            password,
        }) ?? false)
));

// Middleware
export default {
    // Login process
    login: (req, res, next) =>
        passport.authenticate("local", { session: false },
            (err, user) => {
                if (
                    (
                        err ? next(err)
                            : (!user ? res.redirect("/login") : 1)
                    ) === 1
                ) {
                    req.session.userID = user.username;
                    res.redirect("/article");
                }
            }
        )(req, res, next)
}
