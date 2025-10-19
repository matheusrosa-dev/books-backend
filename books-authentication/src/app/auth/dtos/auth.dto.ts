import { Expose, Type } from 'class-transformer';

export class SessionDto {
  @Expose()
  userId: string;

  @Expose()
  role: string;
}

export class AuthDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  @Type(() => SessionDto)
  session: SessionDto;

  @Expose()
  @Type(() => SessionDto)
  refreshSession: SessionDto;
}
