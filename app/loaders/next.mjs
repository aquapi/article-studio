import { config } from 'dotenv';
// Next.js server
import { default as Next } from "next";

// Load ENV
config();

// Next.js server
const next = Next({
    dev: process.env.NODE_ENV !== "production"
});

// Export the Next.js server
export default next;
