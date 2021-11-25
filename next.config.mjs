/**
 * @type {import('next').NextConfig}
 */

export default {
    modern: true,
    experimental: {
        esmExternals: true,
    },
    useFileSystemPublicRoutes: false
};