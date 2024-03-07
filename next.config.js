/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/certidoes/:path*',
                destination: 'https://certidoes-apf.apps.tcu.gov.br/api/rest/publico/certidoes/:path*',
            },
            {
                source: '/pncp/:path*',
                destination: 'https://pncp.gov.br/api/pncp/:path*',
            },
            {
                source: '/cnetmobile/:path*',
                destination: 'http://127.0.0.1:8000/cnetmobile/:path*'
            }
        ];
    },
    experimental: {
        proxyTimeout: 900000, //15min
    },
};

module.exports = nextConfig;