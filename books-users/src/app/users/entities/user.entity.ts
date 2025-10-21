import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../../shared/common/entities';
import { Role } from './role.entity';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity<User> {
  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
