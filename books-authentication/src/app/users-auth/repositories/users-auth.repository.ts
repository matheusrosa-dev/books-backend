import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories';
import { UserAuth } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersAuthRepository extends BaseRepository<UserAuth> {
  constructor(
    @InjectRepository(UserAuth)
    private readonly repository: BaseRepository<UserAuth>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
