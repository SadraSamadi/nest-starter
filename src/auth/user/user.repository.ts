import {EntityRepository} from 'typeorm';
import {CoreRepository} from '../../core/core.repository';
import {UserEntity} from './user.model';

@EntityRepository(UserEntity)
export class UserRepository extends CoreRepository<UserEntity> {

}
