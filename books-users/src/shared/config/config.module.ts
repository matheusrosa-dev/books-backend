import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import {
  apiConfig,
  databaseConfig,
  rabbitmqConfig,
  validationSchema,
} from './config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [apiConfig, databaseConfig, rabbitmqConfig],
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
