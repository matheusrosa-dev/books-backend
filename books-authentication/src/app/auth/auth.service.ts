import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import {
  GetSessionByTokenDto,
  LoginDto,
  LogoutDto,
  RefreshSessionDto,
  RegisterDto,
} from './dtos';
import { UsersAuthService } from '../users-auth/users-auth.service';
import { AuthTokensService } from '../../providers/redis/auth-tokens.service';
import { HttpUsersService } from '../../shared/http/http-users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersAuthService: UsersAuthService,
    private httpUsersService: HttpUsersService,
    private authTokensService: AuthTokensService,
  ) {}

  async register(registerDto: RegisterDto) {
    const foundUserAuth = await this.usersAuthService.findByEmail(
      registerDto.email,
    );

    if (foundUserAuth) {
      throw new ConflictException('User already exists');
    }

    const createdUser = await this.httpUsersService.createUser({
      name: registerDto.name,
      email: registerDto.email,
    });

    await this.usersAuthService.create({
      userId: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
      password: registerDto.password,
    });

    const tokens = await this.authTokensService.generateOpaqueTokens({
      userId: createdUser.id,
      role: createdUser.role,
    });

    return tokens;
  }

  async login(loginDto: LoginDto) {
    const foundUser = await this.usersAuthService.findByEmail(loginDto.email);
    console.log('foundUser: ', foundUser);

    if (!foundUser) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = foundUser.comparePassword(loginDto.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.authTokensService.generateOpaqueTokens({
      userId: foundUser.userId,
      role: foundUser.role,
    });

    return tokens;
  }

  async getSessionByToken({ accessToken, refreshToken }: GetSessionByTokenDto) {
    const promises = [
      this.authTokensService.findSessionByAccessToken(accessToken),
      this.authTokensService.findSessionByRefreshToken(refreshToken),
    ];

    const [session, refreshSession] = await Promise.all(promises);

    return {
      session,
      refreshSession: session ? null : refreshSession,
    };
  }

  async refreshSession({ refreshToken }: RefreshSessionDto) {
    const session =
      await this.authTokensService.findSessionByRefreshToken(refreshToken);

    if (!session) {
      throw new BadRequestException('Invalid refresh token');
    }

    const tokens = await this.authTokensService.generateOpaqueTokens(session);

    return tokens;
  }

  async logout({ userId }: LogoutDto) {
    await this.authTokensService.revokeTokensByUserId(userId);
  }
}
