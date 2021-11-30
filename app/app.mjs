// Next server config
import { next } from './next.mjs';
await next.prepare();

// Connect to database
import mongoose from 'mongoose';
import { url, settings } from "../resource/resource.mjs";

// Connect to database
await mongoose.connect(url, settings).catch(err => console.log(err));

// Socket event handler
import '../routes/socket/event.mjs';

// Display articles
import '../routes/article/collections.mjs';
import '../routes/article/homepage.mjs';

// Editor
import '../routes/editor/editor.mjs';

// Article content
import '../routes/content/read.mjs';
import '../routes/content/discuss.mjs';

// Account
import '../routes/account/login.mjs';
import '../routes/account/profile.mjs';

// Delete
import '../routes/delete/delete.mjs';

// 404 Error
import '../routes/404/404.mjs';
