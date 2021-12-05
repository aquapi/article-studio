import app from "../../app/config.mjs";
import next from "../../app/next.mjs";
import mongoose from "mongoose";

let Csession;

// User's Profile
app.get("/article/profile", async (req, res) => {
    Csession = req.session;
    if (!Csession && !Csession.userID)
        res.redirect("/login");
    const name = req.session && req.session.userID ? req.session.userID : "";
    const pass = await mongoose.model("User").findOne({
        username: name
    }).then(r => r && r.password ? r.password : "No password");
    return next.render(req, res, "/account/profile", { name: name, pass: pass });
});
