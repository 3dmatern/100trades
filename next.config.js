/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "31.129.102.70",
                port: "",
                pathname: "/images/**",
            },
            {
                protocol: "http",
                hostname: "31.129.102.70",
                port: "3001",
                pathname: "/images/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3001",
                pathname: "/images/**",
            },
        ],
    },
};

module.exports = nextConfig;
