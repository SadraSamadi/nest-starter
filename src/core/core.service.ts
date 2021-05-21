import {ClassConstructor, plainToClass, plainToClassFromExist} from 'class-transformer';
import {Request} from 'express';
import {DeepPartial, FindConditions} from 'typeorm';
import {ATTACHMENT, CONDITIONS} from './core.constant';
import {CoreEntity, Page, Paging} from './core.model';
import {CoreRepository} from './core.repository';

export abstract class CoreService<E extends CoreEntity, R extends CoreRepository<E> = CoreRepository<E>> {

  public get type(): ClassConstructor<E> {
    return this.repository.target as ClassConstructor<E>;
  }

  protected constructor(protected repository: R) {
  }

  public async createOne(partial: DeepPartial<E>, request?: Request): Promise<E> {
    let entity = await this.create(partial, request);
    return this.save(entity, request);
  }

  public async findOneById(id: number, request?: Request): Promise<E> {
    let conditions = request?.[CONDITIONS] as FindConditions<E>;
    return this.repository.findOneOrFail(id, conditions ? {where: [conditions]} : null);
  }

  public async findMany(paging: Paging, request?: Request): Promise<Page<E>> {
    let conditions = request?.[CONDITIONS] as FindConditions<E>;
    return this.repository.findMany(paging, conditions ? {where: [conditions]} : null);
  }

  public async findAll(request?: Request): Promise<E[]> {
    let conditions = request?.[CONDITIONS] as FindConditions<E>;
    return this.repository.find(conditions ? {where: [conditions]} : null);
  }

  public async updateOne(entity: E, partial: DeepPartial<E>, request?: Request): Promise<E> {
    entity = await this.merge(entity, partial, request);
    return this.save(entity, request);
  }

  public async updateOneById(id: number, partial: DeepPartial<E>, request?: Request): Promise<E> {
    let entity = await this.findOneById(id, request);
    return this.updateOne(entity, partial, request);
  }

  public async deleteOne(entity: E, request?: Request): Promise<E> {
    return this.remove(entity, request);
  }

  public async deleteOneById(id: number, request?: Request): Promise<E> {
    let entity = await this.findOneById(id, request);
    return this.deleteOne(entity, request);
  }

  public async create(partial: DeepPartial<E>, request?: Request): Promise<E> {
    let attachment = request?.[ATTACHMENT] as E;
    return plainToClass(this.type, {...partial, ...attachment});
  }

  public async merge(entity: E, partial: DeepPartial<E>, request?: Request): Promise<E> {
    let attachment = request?.[ATTACHMENT] as E;
    return plainToClassFromExist(entity, {...partial, ...attachment});
  }

  public async save(entity: E, request?: Request): Promise<E> {
    return this.repository.save(entity as object);
  }

  public async remove(entity: E, request?: Request): Promise<E> {
    return this.repository.remove(entity);
  }

}
