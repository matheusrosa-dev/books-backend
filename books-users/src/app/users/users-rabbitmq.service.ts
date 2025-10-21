import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersRabbitMQService {
  constructor(
    @Inject('RABBITMQ_USERS')
    private client: ClientProxy,
  ) {}

  updateEmail(userId: string, email: string) {
    return this.client.emit('users.update_email', {
      userId,
      email,
    });
  }
}
