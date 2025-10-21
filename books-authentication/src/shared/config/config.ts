import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import 'dotenv/config';

import {
  IDatabaseConfig,
  IApiConfig,
  IUsersApiConfig,
  IRedisConfig,
  IRabbitMQConfig,
} from './interfaces';

export const apiConfig = registerAs<IApiConfig>('api', () => ({
  port: Number(process.env.API_PORT),
}));

export const databaseConfig = registerAs<IDatabaseConfig>('database', () => ({
  port: Number(process.env.DATABASE_PORT),
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  name: process.env.DATABASE_NAME!,
}));

export const usersApiConfig = registerAs<IUsersApiConfig>('users-api', () => ({
  url: process.env.USERS_API_URL!,
}));

export const redisConfig = registerAs<IRedisConfig>('redis', () => ({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST!,
}));

export const rabbitmqConfig = registerAs<IRabbitMQConfig>('rabbitmq', () => ({
  port: Number(process.env.RABBITMQ_PORT),
  host: process.env.RABBITMQ_HOST!,
  user: process.env.RABBITMQ_USER!,
  password: process.env.RABBITMQ_PASSWORD!,
  usersQueue: process.env.RABBITMQ_USERS_QUEUE!,
  durable: process.env.RABBITMQ_DURABLE === 'true',
}));

export const validationSchema = Joi.object({
  API_PORT: Joi.number().required(),

  DATABASE_PORT: Joi.number().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),

  REDIS_PORT: Joi.number().required(),
  REDIS_HOST: Joi.string().required(),

  USERS_API_URL: Joi.string().required(),

  RABBITMQ_PORT: Joi.number().required(),
  RABBITMQ_HOST: Joi.string().required(),
  RABBITMQ_USER: Joi.string().required(),
  RABBITMQ_PASSWORD: Joi.string().required(),
  RABBITMQ_USERS_QUEUE: Joi.string().required(),
  RABBITMQ_DURABLE: Joi.boolean().required(),
});
