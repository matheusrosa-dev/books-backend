import { Controller, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { HttpAuthService } from '../../http/http-auth.service';
import { CurrentSession, Public } from '../../decorators';
import type { ISession } from '../../interfaces/session.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly httpAuthService: HttpAuthService) {}

  @Public()
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const tokens = await this.httpAuthService.login(req.body);

    this.setAuthTokensCookie({
      res,
      tokens,
    });

    return res.status(201).send();
  }

  @Public()
  @Post('register')
  async register(@Req() req: Request, @Res() res: Response) {
    const tokens = await this.httpAuthService.register(req.body);

    this.setAuthTokensCookie({
      res,
      tokens,
    });

    return res.status(201).send();
  }

  @Post('logout')
  async logout(@Res() res: Response, @CurrentSession() session: ISession) {
    await this.httpAuthService.logout({
      userId: session.userId,
    });

    this.destroyAuthTokensCookie(res);

    return res.status(204).send();
  }

  setAuthTokensCookie(props: {
    res: Response;
    tokens: { accessToken: string; refreshToken: string };
  }) {
    const { res, tokens } = props;

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
    });
  }

  destroyAuthTokensCookie(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }
}
