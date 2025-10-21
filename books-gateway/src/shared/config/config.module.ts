import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { apiConfig, httpConfig, validationSchema } from './config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [apiConfig, httpConfig],
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
