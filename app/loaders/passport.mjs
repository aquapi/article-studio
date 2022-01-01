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
    login: passport.authenticate("local",
        {
            session: false,
            failureMessage: "Invalid username or password",
            failureRedirect: "/login"
        }
    )
}
