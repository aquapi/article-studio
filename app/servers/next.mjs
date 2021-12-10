import { default as Next } from "next";

// Load ENV
import { config } from 'dotenv';
config();

// Next.js server
const next = Next({ dev: process.env.NODE_ENV !== "production" });

// Export Next.js server
export default next;