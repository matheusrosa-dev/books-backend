import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import 'dotenv/config';

import { IApiConfig, IHttpConfig } from './interfaces';

export const apiConfig = registerAs<IApiConfig>('api', () => ({
  port: Number(process.env.API_PORT),
}));

export const httpConfig = registerAs<IHttpConfig>('http', () => ({
  usersApiUrl: process.env.USERS_API_URL!,
  authApiUrl: process.env.AUTH_API_URL!,
}));

export const validationSchema = Joi.object({
  API_PORT: Joi.number().required(),

  USERS_API_URL: Joi.string().required(),
  AUTH_API_URL: Joi.string().required(),
});
