import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared/common/repositories';
import { Role } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesRepository extends BaseRepository<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly repository: BaseRepository<Role>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
