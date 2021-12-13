import app from "../../app/config.mjs";
import next from "../../app/servers/next.mjs";
import mongoose from "mongoose";

// User's Profile
app.get("/article/profile", async (req, res) =>
    await next.render(req, res, "/account/profile", {
        name: req.session?.userID ?? "None",
        pass: await mongoose.model("User").findOne({
            username: req.session?.userID ?? ""
        }).then(r => r?.password ?? "No password")
    })
);
 