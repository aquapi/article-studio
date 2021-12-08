import app from "./config.mjs";
import https from "https";
import fs from "fs";

// Create server
const server = https.createServer({
    key: fs.readFileSync("ssl/key.pem"),
    cert: fs.readFileSync('ssl/cert.pem')
}, app)

// Export server
export default server;