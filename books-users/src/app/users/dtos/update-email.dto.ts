import { IsEmail, MaxLength } from 'class-validator';

export class UpdateEmailDto {
  @IsEmail()
  @MaxLength(50)
  email: string;
}
