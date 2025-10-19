import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './entities';
import { UsersAuthRepository } from './repositories';
import { UsersAuthService } from './users-auth.service';

@Module({
  providers: [UsersAuthRepository, UsersAuthService],
  imports: [TypeOrmModule.forFeature([UserAuth])],
  exports: [UsersAuthService],
})
export class UsersAuthModule {}
