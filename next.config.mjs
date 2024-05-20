/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            // apiUtils 서버로의 요청에 대한 proxy 설정
            {
                source: '/apiUtils/:path*',
                destination: `${process.env.NEXT_PUBLIC_BO_GW_API_URL}/api/:path*`
            },
        ];
    },
};

export default nextConfig;
