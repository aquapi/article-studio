import passport from "passport";
import User from "../models/user.mjs";
import { Strategy as LocalStrategy } from "passport-local";

// Strategies
passport.use(new LocalStrategy(
    async (username, _, cb) =>
        cb(null, await User.findOne({
            username,
        }) ?? false)
));