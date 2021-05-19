import {Injectable} from '@nestjs/common';
import {DeepPartial} from 'typeorm';
import {CoreService} from '../../core/core.service';
import {PermissionEntity} from './permission.model';
import {RoleEntity} from './role.model';
import {RoleRepository} from './role.repository';

@Injectable()
export class RoleService extends CoreService<RoleEntity> {

  public constructor(repository: RoleRepository) {
    super(repository);
  }

  public async createOneByName(name: string, permissions: DeepPartial<PermissionEntity>[]): Promise<RoleEntity> {
    return this.createOne({name, permissions});
  }

  public async findOneByName(name: string): Promise<RoleEntity> {
    return this.repository.findOneOrFail({name});
  }

}
