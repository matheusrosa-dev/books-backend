import { Global, Module } from '@nestjs/common';
import { HttpAuthService } from './http-auth.service';
import { HttpUsersService } from './http-users.service';

@Global()
@Module({
  providers: [HttpAuthService, HttpUsersService],
  exports: [HttpAuthService, HttpUsersService],
})
export class HttpModule {}
