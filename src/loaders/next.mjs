import 'dotenv/config';

// Next.js server
import Next from "next";

// Next.js server
const next = Next({
    dev: process.env.NODE_ENV !== "production",
    customServer: true,
    conf: {
        modern: true,
        experimental: {
            esmExternals: true,
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
