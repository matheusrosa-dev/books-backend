import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './entities';
import { UsersAuthRepository } from './repositories';
import { UsersAuthService } from './users-auth.service';
import { UsersAuthController } from './users-auth.controller';
import { UsersAuthRabbitMQService } from './users-auth-rabbitmq.service';

@Module({
  providers: [UsersAuthRepository, UsersAuthService, UsersAuthRabbitMQService],
  imports: [TypeOrmModule.forFeature([UserAuth])],
  controllers: [UsersAuthController],
  exports: [UsersAuthService],
})
export class UsersAuthModule {}
