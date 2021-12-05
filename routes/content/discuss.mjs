import app from "../../app/config.mjs";
import next from "../../app/next.mjs";

let Csession;

// Discuss page
app.get("/discuss/:name", (req, res) => {
    Csession = req.session;
    return next.render(req, res, "/discuss/discuss", {
        name: req.params.name,
        user: Csession.userID ?? "User" + Math.round(Math.random() * 100000)
    });
});
