import { Expose, Transform } from 'class-transformer';

export class UsersDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  @Transform(({ obj }) => obj.role.name)
  role: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdAt: string;
}
