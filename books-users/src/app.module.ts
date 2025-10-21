import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/config/config.module';
import { PostgresModule } from './providers';
import { UsersModule } from './app';

@Module({
  imports: [ConfigModule, PostgresModule, UsersModule],
})
export class AppModule {}
