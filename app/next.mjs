import next from "next";

// Load ENV
import { config } from 'dotenv';
config();

// Next.js server
export default next({ dev: process.env.NODE_ENV !== "production" });