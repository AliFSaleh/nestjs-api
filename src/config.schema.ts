import * as Joi from 'joi'

export const ConfigSchemaValidation = Joi.object({
    PORT: Joi.number().default(3000).required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
}) 