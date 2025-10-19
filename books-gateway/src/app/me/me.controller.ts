import { Controller, Get } from '@nestjs/common';
import { HttpUsersService } from '../../http/http-users.service';
import { CurrentSession } from '../../decorators';
import type { ISession } from '../../interfaces/session.interface';

@Controller('me')
export class MeController {
  constructor(private httpUsersService: HttpUsersService) {}

  @Get()
  async getMe(@CurrentSession() session: ISession) {
    const data = await this.httpUsersService.getById({
      userId: session.userId,
    });

    return data;
  }
}
