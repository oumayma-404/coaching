import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    output: 'standalone', // Required for Docker deployment
    images: {
        domains: ['res.cloudinary.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'coaching-z16f.onrender.com',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/uploads/**',
            },
        ],
    },
}

export default nextConfig;
