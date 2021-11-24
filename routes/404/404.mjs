import app from "../../app/config.mjs";

// 404
app.get("/*", (_req, res) => {
    res.redirect("/article");
});
