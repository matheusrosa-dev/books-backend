import { Injectable } from '@nestjs/common';
import { UsersAuthRepository } from './repositories';

@Injectable()
export class UsersAuthService {
  constructor(private usersAuthRepository: UsersAuthRepository) {}

  async create(data: {
    userId: string;
    email: string;
    password: string;
    role: string;
  }) {
    const createdUserAuth = this.usersAuthRepository.create(data);

    return this.usersAuthRepository.save(createdUserAuth);
  }

  async findByEmail(email: string) {
    return this.usersAuthRepository.findOne({
      where: { email },
    });
  }
}
