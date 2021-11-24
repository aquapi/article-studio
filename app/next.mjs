import next from "next";
import { config } from "dotenv";
config();

const option = process.env.NODE_ENV !== "production";
// Next.js server
export const next_server = next({ option });  