import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
    MONGODB_CNN: Joi.string().required(),
    PORT: Joi.number().default(3000),
})