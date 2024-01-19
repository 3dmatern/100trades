/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "31.129.102.70",
                port: "3000",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
