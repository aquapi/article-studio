import app from "../../app/config.mjs";

// 404
app.get("/*", (_, res) => res.redirect("/article"));
 