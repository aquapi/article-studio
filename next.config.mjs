/**
 * @type {import('next').NextConfig}
 */

const config = {
    modern: true,
    experimental: {
        esmExternals: true,
    },
    useFileSystemPublicRoutes: false,
}

export default config;