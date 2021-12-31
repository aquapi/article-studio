import passport from "passport";
import { DB } from "../resource.mjs";
import { Strategy as LocalStrategy } from "passport-local";

// Strategies
passport.use(new LocalStrategy(
    async (username, password, cb) => 
        cb(null, await DB.users.findOne({
            username,
            password,
        }) ?? false)
));

export default {
    local: passport.authenticate("local", 
		{
			session: false,
			failureMessage: "Invalid username or password",
			failureRedirect: "/login"
		}
	),
}
