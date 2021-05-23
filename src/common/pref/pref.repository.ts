import {EntityRepository, Repository} from 'typeorm';
import {PrefEntity} from './pref.model';

@EntityRepository(PrefEntity)
export class PrefRepository extends Repository<PrefEntity> {

}
