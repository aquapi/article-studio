import app from "../../app/loaders/express.mjs";
import next from "../../app/loaders/next.mjs";

// Discuss page
app.get("/discuss/:name", async (req, res) => 
    next.render(req, res, "/discuss", {
        name: req.params?.name ?? res.redirect("/article"),
        user: req.session?.userID ?? "User" + Math.round(Math.random() * 100000)
    })
);
 