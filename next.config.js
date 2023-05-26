/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media4.giphy.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'media3.giphy.com',
                port: '',
            
            },
            {
                protocol: 'https',
                hostname: 'media2.giphy.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'media1.giphy.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'media0.giphy.com',
                port: '',
            },
            
        ],
    },
}

module.exports = nextConfig
