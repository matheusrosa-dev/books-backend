import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { IApiConfig } from './shared/config/interfaces';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);

  const apiConfig = config.get<IApiConfig>('api')!;

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(apiConfig.port);
}
bootstrap();
