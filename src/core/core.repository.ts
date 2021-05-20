import {FindConditions, FindManyOptions, Repository} from 'typeorm';
import {CoreEntity, Page, Paging} from './core.model';

export class PagingRepository<T> extends Repository<T> {

  public async findMany(paging: Paging, conditions?: FindManyOptions<T> | FindConditions<T>): Promise<Page<T>> {
    let options = paging.convert<T>();
    let results = await this.findAndCount({...options, ...conditions});
    return Page.from(results, paging);
  }

}

export class CoreRepository<E extends CoreEntity> extends PagingRepository<E> {

}
