import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
    MONGODB_CNN: Joi.string().required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required(),
    CLOUDINARY_CLOUD_NAME: Joi.string().required(),
    CLOUDINARY_API_KEY: Joi.string().required(),
    CLOUDINARY_API_SECRET: Joi.string().required(),
})