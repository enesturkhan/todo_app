/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/api/:path*',
                    destination: '/api/:path*'
                }
            ]
        };
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
                    { key: "Access-Control-Allow-Headers", value: "Content-Type" },
                    { key: "Content-Type", value: "application/json" }
                ]
            }
        ];
    }
};

module.exports = nextConfig; 