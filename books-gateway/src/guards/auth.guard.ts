import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { HttpAuthService } from '../shared/http/http-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly httpAuthService: HttpAuthService,
    private readonly reflector: Reflector,
  ) {}

  private getIsPublic(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    return isPublic;
  }

  private async getSessionByTokens(req: Request) {
    const accessToken = req?.cookies?.access_token as string | undefined;
    const refreshToken = req?.cookies?.refresh_token as string | undefined;

    if (!accessToken || !refreshToken) {
      return {
        session: null,
        refreshSession: null,
      };
    }

    return this.httpAuthService.getSessionByToken({
      accessToken,
      refreshToken,
    });
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const isPublic = this.getIsPublic(context);

    if (isPublic) return true;

    const { session, refreshSession } = await this.getSessionByTokens(req);

    if (!session && !refreshSession) return false;

    if (!session) {
      const refreshToken = req.cookies.refresh_token as string;

      const tokens = await this.httpAuthService.refreshSession({
        refreshToken: refreshToken,
      });

      res.cookie('access_token', tokens.accessToken, {
        httpOnly: true,
      });

      res.cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
      });

      req.session = refreshSession;

      return true;
    }

    req.session = session;

    return true;
  }
}
