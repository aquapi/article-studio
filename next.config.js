/**
 * @type {import('next').NextConfig}
 */

module.exports = {
    modern: true,
    experimental: {
        esmExternals: true,
    },
    useFileSystemPublicRoutes: false,
};