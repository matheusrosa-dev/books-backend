import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RolesRepository, UsersRepository } from '../users/repositories';
import { CreateUserDto, UpdateEmailDto } from './dtos';
import { Roles } from './enums';
import { UsersRabbitMQService } from './users-rabbitmq.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private usersRabbitMQService: UsersRabbitMQService,
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

  async updateEmail(userId: string, dto: UpdateEmailDto) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found');

    const userWithSameEmail = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (userWithSameEmail && userWithSameEmail.id === userId) {
      throw new BadRequestException('New email is the same as the old one');
    }

    if (userWithSameEmail) {
      throw new ConflictException('Email already exists');
    }

    user.email = dto.email;

    await this.usersRepository.save(user);

    this.usersRabbitMQService.updateEmail(userId, dto.email);
  }
}
