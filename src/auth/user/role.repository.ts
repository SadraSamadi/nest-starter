import {EntityRepository} from 'typeorm';
import {CoreRepository} from '../../core/core.repository';
import {RoleEntity} from './role.model';

@EntityRepository(RoleEntity)
export class RoleRepository extends CoreRepository<RoleEntity> {

}
