import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import {CoreService} from '../../core/core.service';
import {PermissionEntity} from './permission.model';
import {RoleEntity} from './role.model';

@Injectable()
export class RoleService extends CoreService<RoleEntity> {

  public constructor(@InjectRepository(RoleEntity) repository: Repository<RoleEntity>) {
    super(repository);
  }

  public async createOneByName(name: string, permissions: DeepPartial<PermissionEntity>[]): Promise<RoleEntity> {
    return this.createOne({name, permissions});
  }

  public async findOneByName(name: string): Promise<RoleEntity> {
    return this.repository.findOneOrFail({name});
  }

}
