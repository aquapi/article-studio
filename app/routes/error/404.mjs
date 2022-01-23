import app from "../../loaders/express.mjs";

// 404
app.get("/*", (_, res) => res.redirect("/article"));
   