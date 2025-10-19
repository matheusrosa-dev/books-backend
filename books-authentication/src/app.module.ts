import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PostgresModule } from './providers/postgres/postgres.module';
import { AuthModule, UsersAuthModule } from './app';
import { HttpModule } from './http/http.module';
import { RedisModule } from './providers';

@Module({
  imports: [
    ConfigModule,
    PostgresModule,
    RedisModule,
    HttpModule,
    UsersAuthModule,
    AuthModule,
  ],
})
export class AppModule {}
