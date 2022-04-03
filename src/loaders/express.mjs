import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import "dotenv/config";
import createMemoryStore from "memorystore";
import hpp from "hpp";
import passport from "passport";
import fs from "fs";

// Memory store
const MemoryStore = createMemoryStore(session);

// Init app
const app = express()

    // Trust first proxy
    .set('trust proxy', 1)

    // Use resources in public directory
    .use(express.static("public"))

    // Use for GET and POST request (Increase limit)
    .use(express.json({ limit: '200mb' }))
    .use(express.urlencoded({
        limit: '200mb',
        extended: true
    }))
    .use(express.text({ limit: '200mb' }))

    // cookie parser middleware
    .use(cookieParser())

    // Use session middleware
    .use(
        session({
            secret: process.env.SESSION_SECRET, // Secret
            saveUninitialized: false, // Prevent the session store from saving uninitialized sessions
            cookie: {
                maxAge: 1000 * 60 * 60 * 24, // One day
                secure: true, // Secure cookie in HTTPS
                httpOnly: true
            },
            resave: false, // Prevent the session store from saving unmodified sessions
            store: new MemoryStore({
                checkPeriod: 86400000 // prune expired entries every 24h
            }), // Prevent memory leaks
            unset: 'destroy', // Destroy the session after set to null
        })
    )

    // Passport auth
    .use(passport.initialize())

    // Use hpp middleware
    .use(hpp())

    // Next static
    .use((req, res, next) => {
        if (req.url.startsWith("/_next"))
            res.send(fs.readFileSync(req.url.replace("/_next", "./.next")));
        next();
    })

    // Blocking others from seeing this app is running
    .disable('x-powered-by');

// Export app
export default app;