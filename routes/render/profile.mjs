import app from "../../app/loaders/express.mjs";
import { next } from "../../app/loaders/servers.mjs";
import User from "../../models/user.mjs";

// User's Profile
app.get("/article/profile", async (req, res) =>
    next.render(req, res, "/account/profile", {
        name: req.session?.userID ?? "None",
        pass: await User.findOne({
            username: req.session?.userID ?? ""
        }).then(r => r?.password ?? "No password")
    })
);
 