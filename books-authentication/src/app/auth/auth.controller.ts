import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthDto,
  GetSessionByTokenDto,
  LoginDto,
  LogoutDto,
  RefreshSessionDto,
  RegisterDto,
} from './dtos';
import { Serialize } from '../../interceptors/serialize.interceptor';

@Controller('auth')
@Serialize(AuthDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('get-session-by-token')
  async getSessionByToken(@Query() getSessionByTokenDto: GetSessionByTokenDto) {
    return this.authService.getSessionByToken(getSessionByTokenDto);
  }

  @Post('refresh-session')
  async refreshSession(@Body() refreshSessionDto: RefreshSessionDto) {
    return this.authService.refreshSession(refreshSessionDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Body() logoutDto: LogoutDto) {
    return this.authService.logout(logoutDto);
  }
}
