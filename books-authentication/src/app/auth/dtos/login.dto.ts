import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @Length(8, 50)
  password: string;
}
