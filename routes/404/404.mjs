import app from "../../app/loaders/express.mjs";

// 404
app.get("/*", (_, res) => res.redirect("/article"));
   