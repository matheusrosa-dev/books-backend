import { Module } from '@nestjs/common';
import { HttpUsersService } from './http-users.service';

@Module({
  providers: [HttpUsersService],
  exports: [HttpUsersService],
})
export class HttpModule {}
