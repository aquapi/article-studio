// Main app
import app from "./express.mjs";
// HTTPS Module
import https from "https";
// File System
import fs from "fs";
import { config } from 'dotenv';
// Next.js
import { default as Next } from "next";

// Load ENV
config();

// Next.js server
export const next = Next({ dev: process.env.NODE_ENV !== "production" });

// HTTPS server
export const target = https.createServer({
    key: fs.readFileSync("ssl/key.pem"),
    cert: fs.readFileSync('ssl/cert.pem')
}, app);
