/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    serverActions: {
      allowedOrigins: [ "localhost:3000","127.0.0.1"],
      
    }
  },
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ]
  }
};

export default nextConfig;
