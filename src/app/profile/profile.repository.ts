import {EntityRepository} from 'typeorm';
import {CoreRepository} from '../../core/core.repository';
import {ProfileEntity} from './profile.model';

@EntityRepository(ProfileEntity)
export class ProfileRepository extends CoreRepository<ProfileEntity> {

}
