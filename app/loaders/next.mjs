import { config } from 'dotenv';
// Next.js server
import Next from "next";

// Load ENV
config();

// Next.js server
const next = Next({
    dev: process.env.NODE_ENV !== "production",
    customServer: true,
    conf: {
        modern: true,
        experimental: {
            esmExternals: true,
            styledComponents: true,
        },
        useFileSystemPublicRoutes: false,
        poweredByHeader: false,
        httpAgentOptions: {
            keepAlive: false
        }
    }
});

// Export the Next.js server
export default next;
