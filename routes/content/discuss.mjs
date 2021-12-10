import app from "../../app/config.mjs";
import next from "../../app/servers/next.mjs";

// Discuss page
app.get("/discuss/:name", (req, res) => 
    next.render(req, res, "/discuss/discuss", {
        name: req.params?.name ?? res.redirect("/article"),
        user: req.session?.userID ?? "User" + Math.round(Math.random() * 100000)
    })
);
