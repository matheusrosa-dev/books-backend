import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_USERS',
        transport: Transport.RMQ,
        options: {
          // TODO: Corrigir
          urls: ['amqp://root:root@books-rabbitmq:5672'],
          queue: 'users_queue',
          queueOptions: {
            // TODO: Corrigir
            durable: true,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitMQModule {}
