import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RolesRepository, UsersRepository } from '../users/repositories';
import { CreateUserDto } from './dtos';
import { Roles } from './enums';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private rolesRepository: RolesRepository,
  ) {}

  async create(dto: CreateUserDto) {
    const foundUser = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (foundUser) {
      throw new ConflictException('User already exists');
    }

    const role = await this.rolesRepository.findOne({
      where: { name: Roles.USER },
    });

    const user = this.usersRepository.create({
      ...dto,
      role: role!,
    });

    await this.usersRepository.save(user);

    return user;
  }

  async findById(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
