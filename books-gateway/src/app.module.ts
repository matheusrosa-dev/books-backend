import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/config/config.module';
import { AuthModule, MeModule } from './app';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards';
import { HttpModule } from './shared/http/http.module';

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
