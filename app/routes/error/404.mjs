import app from "../../loaders/express.mjs";

// 404
app.get("/*", (_, res) => { 
    res.writeHead(200, {
        "Location": "/article"
    });
    res.end();
});
   