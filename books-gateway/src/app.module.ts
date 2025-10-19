import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule, MeModule } from './app';
import { HttpModule } from './http/http.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards';

@Module({
  imports: [ConfigModule, HttpModule, AuthModule, MeModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
