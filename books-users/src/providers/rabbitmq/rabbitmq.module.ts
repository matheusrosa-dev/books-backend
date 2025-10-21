import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IRabbitMQConfig } from '../../shared/config/interfaces';
import { ConfigModule } from '../../shared/config/config.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_USERS',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const rabbitmqConfig = configService.get(
            'rabbitmq',
          ) as IRabbitMQConfig;

          return {
            transport: Transport.RMQ,
            options: {
              urls: [
                `amqp://${rabbitmqConfig.user}:${rabbitmqConfig.password}@${rabbitmqConfig.host}:${rabbitmqConfig.port}`,
              ],
              queue: rabbitmqConfig.usersQueue,
              queueOptions: {
                durable: rabbitmqConfig.durable,
              },
            },
          };
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitMQModule {}
