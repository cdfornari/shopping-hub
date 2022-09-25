export const EnvConfig = () => ({
    environment: process.env.NODE_ENV || 'development',
    mongodb: process.env.MONGODB_CNN,
    port: process.env.PORT || 3000,
})