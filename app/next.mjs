import { default as NextServer } from "next";
import { config } from "dotenv";
config();

const option = process.env.NODE_ENV !== "production";
// Next.js server
export const next = NextServer({ option });
export const handle = next.getRequestHandler();