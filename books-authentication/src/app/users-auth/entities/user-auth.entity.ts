import { BeforeInsert, Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '../../../common/entities';
import * as bcrypt from 'bcrypt';

@Entity('users-auth')
@Unique(['email'])
export class UserAuth extends BaseEntity<UserAuth> {
  @Column()
  userId: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @BeforeInsert()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }

  comparePassword(attempt: string): boolean {
    return bcrypt.compareSync(attempt, this.password);
  }
}
