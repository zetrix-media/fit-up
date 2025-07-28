/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['czazkicksdbdoupuavhi.supabase.co/', 'flagcdn.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'czazkicksdbdoupuavhi.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  // 👇 Add this section to suppress the build-time "critical dependency" warning
  webpack(config) {
    config.module.exprContextCritical = false;
    return config;
  },
};
