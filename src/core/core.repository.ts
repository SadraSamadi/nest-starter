import {FindConditions, FindManyOptions, Repository} from 'typeorm';
import {CoreEntity, Page, Pageable} from './core.model';

export class PagingRepository<T> extends Repository<T> {

  public async findMany(pageable: Pageable, options?: FindManyOptions<T> | FindConditions<T>): Promise<Page<T>> {
    let paging = pageable.convert();
    let results = await this.findAndCount({...paging, ...options});
    return Page.from(results, pageable);
  }

}

export class CoreRepository<E extends CoreEntity> extends PagingRepository<E> {

}
