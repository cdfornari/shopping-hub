export const EnvConfig = () => ({
    environment: process.env.NODE_ENV || 'development',
    mongodb: process.env.MONGODB_CNN,
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
})