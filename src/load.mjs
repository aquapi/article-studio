import 'dotenv/config';
import mongoose from 'mongoose';
import next from './loaders/next.mjs';
import app from './loaders/express.mjs';
import "./loaders/passport.mjs";

// Socket connection
import "./routes/socket/connect.mjs";
import importAll from './utils/importAll.mjs';

// Start the next server 
await next.prepare();

// Connect to database
await mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(console.log);

// Load routes
for (const mod of [
    ...await importAll("./src/routes/render"), 
    ...await importAll("./src/routes/process")
]) 
    app[mod.method](mod.path, mod.handler);
