import { config } from 'dotenv';
import mongoose from 'mongoose';
import next from './loaders/next.mjs';
import "./loaders/passport.mjs";

// Load ENV
config();

// Start the next server 
await next.prepare();

// Connect to database
await mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(console.log);

// Socket connection
import "./routes/socket/connect.mjs";

// Display articles
import './routes/render/collections.mjs';
import './routes/render/homepage.mjs';

// Display editor
import './routes/render/editor.mjs';

// All edit processes
import './routes/process/edit.mjs';

// Article content
import './routes/render/read.mjs';

// Display discuss page
import './routes/render/discuss.mjs';

// Display login and signup page
import './routes/render/login.mjs';

// Diplay profile
import './routes/render/profile.mjs';

// Logout processes
import './routes/process/logout.mjs';

// Login process
import './routes/process/login.mjs';

// Signup process
import './routes/process/signup.mjs';

// Delete process
import './routes/process/delete.mjs';

// 404 Error
import './routes/error/404.mjs';