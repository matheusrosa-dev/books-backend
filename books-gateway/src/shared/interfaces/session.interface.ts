import { Roles } from './roles.enum';

export interface ISession {
  userId: string;
  role: Roles;
}
