import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { HttpModule } from '../../shared/http/http.module';

@Module({
  imports: [HttpModule],
  controllers: [MeController],
})
export class MeModule {}
