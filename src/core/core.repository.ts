import {Repository} from 'typeorm';
import {CoreEntity} from './core.entity';

export abstract class CoreRepository<E extends CoreEntity> extends Repository<E> {

}
