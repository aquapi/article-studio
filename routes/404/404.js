import app from "../../app/config.js";

// 404
app.get("/*", (_req, res) => {
    res.redirect("/article");
});
