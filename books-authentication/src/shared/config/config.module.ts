import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import {
  apiConfig,
  databaseConfig,
  usersApiConfig,
  validationSchema,
  redisConfig,
} from './config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [apiConfig, databaseConfig, usersApiConfig, redisConfig],
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
