/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'k.kakaocdn.net',
            },
            {
                protocol: 'http',
                hostname: 'img1.kakaocdn.net',
            },
        ],
    },
    output: "standalone",
};

export default nextConfig;
