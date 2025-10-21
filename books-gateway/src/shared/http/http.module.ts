import { Module } from '@nestjs/common';
import { HttpAuthService } from './http-auth.service';
import { HttpUsersService } from './http-users.service';

@Module({
  providers: [HttpAuthService, HttpUsersService],
  exports: [HttpAuthService, HttpUsersService],
})
export class HttpModule {}
