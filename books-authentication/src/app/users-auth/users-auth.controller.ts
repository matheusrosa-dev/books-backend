import { Controller } from '@nestjs/common';

import { EventPattern, Payload } from '@nestjs/microservices';
import { UsersAuthRabbitMQService } from './users-auth-rabbitmq.service';

@Controller('users-auth')
export class UsersAuthController {
  constructor(
    private readonly usersAuthRabbitMQService: UsersAuthRabbitMQService,
  ) {}

  @EventPattern('users.update_email')
  updateEmail(@Payload() data: { userId: string; email: string }) {
    return this.usersAuthRabbitMQService.updateEmail(data);
  }
}
