import { Body, Controller, Get, Put } from '@nestjs/common';
import { CurrentSession } from '../../shared/decorators';
import type { ISession } from '../../shared/interfaces/session.interface';
import { HttpUsersService } from '../../shared/http/http-users.service';

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

  @Put('update-email')
  async updateEmail(@CurrentSession() session: ISession, @Body() body) {
    const data = await this.httpUsersService.updateEmail(session.userId, body);

    return data;
  }
}
