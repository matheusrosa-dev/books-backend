import { IsString } from 'class-validator';

export class GetSessionByTokenDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
