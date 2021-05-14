import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {CoreEntity} from './core.entity';
import {CoreRepository} from './core.repository';

export abstract class CoreService<E extends CoreEntity, R extends CoreRepository<E>> extends TypeOrmCrudService<E> {

  protected constructor(protected repository: R) {
    super(repository);
  }

}
