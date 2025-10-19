import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from './entities';
import { RolesRepository, UsersRepository } from './repositories';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersRepository, RolesRepository, UsersService],
})
export class UsersModule {}
