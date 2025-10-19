import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PostgresModule } from './providers/postgres/postgres.module';
import { UsersModule } from './app';

@Module({
  imports: [ConfigModule, PostgresModule, UsersModule],
})
export class AppModule {}
