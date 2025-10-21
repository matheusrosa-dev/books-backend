import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersAuthModule } from '../users-auth/users-auth.module';
import { HttpModule } from '../../shared/http/http.module';

@Module({
  imports: [UsersAuthModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
