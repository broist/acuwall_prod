/**
 * A hirdetési landing aldomainje. Aki az ajanlat.acuwall.hu gyökerét nyitja
 * meg, a /ajanlat oldalt kapja — ugyanabból a konténerből, külön telepítés
 * nélkül. A szabály build időben épül be, ezért módosítás után újra kell
 * építeni az image-et.
 */
const LANDING_HOST = process.env.LANDING_HOST || 'ajanlat.acuwall.hu';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  /**
   * A www-s cím végleges (301) átirányítást kap a fő címre, hogy a Google ne
   * lásson két külön, azonos tartalmú oldalt.
   */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.acuwall.hu' }],
        destination: 'https://acuwall.hu/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          has: [{ type: 'host', value: LANDING_HOST }],
          destination: '/ajanlat',
        },
      ],
    };
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};

export default nextConfig;
