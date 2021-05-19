import {EntityRepository} from 'typeorm';
import {CoreRepository} from '../../core/core.repository';
import {UserEntity} from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends CoreRepository<UserEntity> {

}
