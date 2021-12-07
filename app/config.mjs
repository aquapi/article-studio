import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { config } from "dotenv";
import * as path from "path";
import https from "https";
import fs from "fs";
import createMemoryStore from "memorystore";

// Memory store
const MemoryStore = createMemoryStore(session);

// Load ENV
config();

// create app
const app = express();

// Server
export const server = https.createServer({
    key: fs.readFileSync("ssl/key.pem"),
    cert: fs.readFileSync('ssl/cert.pem')
}, app);

// Trust proxy
app.set('trust proxy', 1);

// Use resources in public directory
app.use(express.static("public"));

// Use for GET and POST request (Increase limit)
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({
    limit: '200mb',
    extended: true
}));
app.use(express.text({ limit: '200mb' }));

// cookie parser middleware
app.use(cookieParser());

// Static root
app.use(express.static(path.resolve()));

// Use session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Secret
    saveUninitialized: false, // Prevent the session store from saving uninitialized sessions
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, // One day
        secure: true // Secure cookie in HTTPS
    },
    resave: false, // Prevent the session store from saving unmodified sessions
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }) // Prevent memory leaks
}));

// Execute when error detected
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send('Error Detected!');
});

// Export app
export default app;