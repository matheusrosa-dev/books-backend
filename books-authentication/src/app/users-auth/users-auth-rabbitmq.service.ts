import { Injectable } from '@nestjs/common';
import { UsersAuthRepository } from './repositories';

@Injectable()
export class UsersAuthRabbitMQService {
  constructor(private usersAuthRepository: UsersAuthRepository) {}

  async updateEmail(data: { userId: string; email: string }) {
    await this.usersAuthRepository.update(
      { userId: data.userId },
      {
        email: data.email,
      },
    );
  }
}
