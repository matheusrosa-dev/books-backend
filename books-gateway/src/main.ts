import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { IApiConfig } from './shared/config/interfaces';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.use(cookieParser.default());

  const config = app.get<ConfigService>(ConfigService);

  const apiConfig = config.get<IApiConfig>('api')!;

  await app.listen(apiConfig.port);
}
bootstrap();
