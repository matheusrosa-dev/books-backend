import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import {
  apiConfig,
  databaseConfig,
  usersApiConfig,
  validationSchema,
  redisConfig,
  rabbitmqConfig,
} from './config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [
        apiConfig,
        databaseConfig,
        usersApiConfig,
        redisConfig,
        rabbitmqConfig,
      ],
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
