import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { IApiConfig, IRabbitMQConfig } from './shared/config/interfaces';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const apiConfig = config.get<IApiConfig>('api')!;
  const rabbitmqConfig = config.get<IRabbitMQConfig>('rabbitmq')!;

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${rabbitmqConfig.user}:${rabbitmqConfig.password}@${rabbitmqConfig.host}:${rabbitmqConfig.port}`,
      ],
      queue: rabbitmqConfig.usersQueue,
      queueOptions: { durable: rabbitmqConfig.durable },
    },
  });

  await app.startAllMicroservices();
  await app.listen(apiConfig.port);
}
bootstrap();
