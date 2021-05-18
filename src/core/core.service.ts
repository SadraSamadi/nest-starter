import {ClassConstructor, plainToClass, plainToClassFromExist} from 'class-transformer';
import {DeepPartial, Repository} from 'typeorm';
import {CoreEntity, RequestPayload} from './core.model';

export abstract class CoreService<E extends CoreEntity, R extends Repository<E> = Repository<E>> {

  public get type(): ClassConstructor<E> {
    return this.repository.target as ClassConstructor<E>;
  }

  protected constructor(protected repository: R) {
  }

  public async createOne(partial: DeepPartial<E>, payload?: RequestPayload<E>): Promise<E> {
    let entity = plainToClass(this.type, {...partial, ...payload?.one});
    return this.repository.save(entity as object);
  }

  public async findOneById(id: number, payload?: RequestPayload<E>): Promise<E> {
    return this.repository.findOneOrFail(id, payload?.options);
  }

  public async findMany(skip: number, take: number, payload?: RequestPayload<E>): Promise<[E[], number]> {
    return this.repository.findAndCount({skip, take, ...payload?.options});
  }

  public async findAll(payload?: RequestPayload<E>): Promise<E[]> {
    return this.repository.find(payload?.options);
  }

  public async updateOneById(id: number, partial: DeepPartial<E>, payload?: RequestPayload<E>): Promise<E> {
    let entity = await this.repository.findOneOrFail(id, payload?.options);
    entity = plainToClassFromExist(entity, {...partial, ...payload?.one});
    return this.repository.save(entity as object);
  }

  public async deleteOneById(id: number, payload?: RequestPayload<E>): Promise<E> {
    let entity = await this.repository.findOneOrFail(id, payload?.options);
    return this.repository.remove(entity);
  }

}
