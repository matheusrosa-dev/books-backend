import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersAuthModule } from '../users-auth/users-auth.module';

@Module({
  imports: [UsersAuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
