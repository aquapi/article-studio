import { config } from 'dotenv';

// Load ENV
config();

// Load passport.js
import "./loaders/passport.mjs";

// Next server config
import { next } from './loaders/servers.mjs';
await next.prepare();

// Connect to database
import mongoose from 'mongoose';
await mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(console.log);

// Socket connection
import "../routes/socket/connect.mjs";

// Display articles
import '../routes/render/homepage/collections.mjs';
import '../routes/render/homepage/homepage.mjs';

// Editor
import '../routes/render/editor.mjs';
import '../routes/process/edit.mjs';

// Article content
import '../routes/render/read.mjs';
import '../routes/process/vote.mjs'
import '../routes/render/discuss.mjs';

// Account
import '../routes/render/login.mjs';
import '../routes/render/profile.mjs';
import '../routes/process/logout.mjs';
import '../routes/process/verify-account.mjs';

// Delete
import '../routes/process/delete.mjs';

// 404 Error
import '../routes/error/404.mjs';