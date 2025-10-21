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

  async deleteAccount(userId: string) {
    const user = await this.usersAuthRepository.findOne({
      where: { userId },
    });

    if (user) {
      await this.usersAuthRepository.softRemove(user);
    }
  }
}
