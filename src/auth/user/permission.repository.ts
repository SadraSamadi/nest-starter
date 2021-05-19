import {EntityRepository} from 'typeorm';
import {CoreRepository} from '../../core/core.repository';
import {PermissionEntity} from './permission.model';

@EntityRepository(PermissionEntity)
export class PermissionRepository extends CoreRepository<PermissionEntity> {

}
