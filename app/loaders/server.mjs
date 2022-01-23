// Main app
import app from "./express.mjs";
// HTTPS Module
import https from "https";
// File System
import fs from "fs";

// HTTPS server
const target = https.createServer({
    key: fs.readFileSync("ssl/key.pem"),
    cert: fs.readFileSync('ssl/cert.pem')
}, app);

// Export the server
export default target;
