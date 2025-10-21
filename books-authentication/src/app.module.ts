import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/config/config.module';
import { PostgresModule } from './providers';
import { AuthModule, UsersAuthModule } from './app';
import { RedisModule } from './providers';
import { HttpModule } from './shared/http/http.module';

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
