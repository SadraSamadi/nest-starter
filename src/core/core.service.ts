import {ClassConstructor, plainToClass, plainToClassFromExist} from 'class-transformer';
import {DeepPartial} from 'typeorm';
import {CoreEntity, Page, Pageable, RequestPayload} from './core.model';
import {CoreRepository} from './core.repository';

export abstract class CoreService<E extends CoreEntity, R extends CoreRepository<E> = CoreRepository<E>> {

  public get type(): ClassConstructor<E> {
    return this.repository.target as ClassConstructor<E>;
  }

  protected constructor(protected repository: R) {
  }

  public async createOne(partial: DeepPartial<E>, payload?: RequestPayload<E>): Promise<E> {
    let entity = await this.create(partial, payload);
    return this.save(entity);
  }

  public async findOneById(id: number, payload?: RequestPayload<E>): Promise<E> {
    return this.repository.findOneOrFail(id, payload?.options);
  }

  public async findMany(pageable: Pageable, payload?: RequestPayload<E>): Promise<Page<E>> {
    return this.repository.findMany(pageable, {...payload?.options});
  }

  public async findAll(payload?: RequestPayload<E>): Promise<E[]> {
    return this.repository.find(payload?.options);
  }

  public async updateOneById(id: number, partial: DeepPartial<E>, payload?: RequestPayload<E>): Promise<E> {
    let entity = await this.findOneById(id, payload);
    entity = await this.merge(entity, partial, payload);
    return this.save(entity);
  }

  public async deleteOneById(id: number, payload?: RequestPayload<E>): Promise<E> {
    let entity = await this.findOneById(id, payload);
    return this.delete(entity);
  }

  public async create(partial: DeepPartial<E>, payload?: RequestPayload<E>): Promise<E> {
    return plainToClass(this.type, {...partial, ...payload?.one});
  }

  public async merge(entity: E, partial: DeepPartial<E>, payload?: RequestPayload<E>): Promise<E> {
    return plainToClassFromExist(entity, {...partial, ...payload?.one});
  }

  public async save(entity: E): Promise<E> {
    return this.repository.save(entity as object);
  }

  public async delete(entity: E): Promise<E> {
    return this.repository.remove(entity);
  }

}
