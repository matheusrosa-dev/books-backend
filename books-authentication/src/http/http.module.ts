import { Global, Module } from '@nestjs/common';
import { HttpUsersService } from './http-users.service';

@Global()
@Module({
  providers: [HttpUsersService],
  exports: [HttpUsersService],
})
export class HttpModule {}
