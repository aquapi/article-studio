
import next from "../../loaders/next.mjs";
import User from "../../models/user.mjs";

// User's Profile
export default {
    path: "/profile",
    method: "get",
    handler: async (req, res) =>
        next.render(req, res, "/views/profile", {
            name: req.session?.userID ?? "None",
            pass: await User.findOne({
                username: req.session?.userID ?? ""
            }).exec().then(r => r?.password ?? "No password")
        })
};
