import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HttpModule } from '../../shared/http/http.module';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
})
export class AuthModule {}
