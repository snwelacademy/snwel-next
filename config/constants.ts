export const constants =  {
    imagePath: '/assets/images',
    // apiBaseUrl: 'https://snwel-backend-2.vercel.app'
    apiBaseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://127.0.0.1:9876'
}
