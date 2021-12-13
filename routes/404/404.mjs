import app from "../../app/servers/express.mjs";

// 404
app.get("/*", (_, res) => res.redirect("/article"));
 