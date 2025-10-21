import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from './entities';
import { RolesRepository, UsersRepository } from './repositories';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRabbitMQService } from './users-rabbitmq.service';
import { RabbitMQModule } from '../../providers';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), RabbitMQModule],
  controllers: [UsersController],
  providers: [
    UsersRepository,
    RolesRepository,
    UsersService,
    UsersRabbitMQService,
  ],
})
export class UsersModule {}
