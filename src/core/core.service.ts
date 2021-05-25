import {Type} from '@nestjs/common';
import {plainToClass, plainToClassFromExist} from 'class-transformer';
import {Request} from 'express';
import {DeepPartial} from 'typeorm';
import {CoreEntity, Page, Paging} from './core.model';
import {CoreRepository} from './core.repository';

export abstract class CoreService<E extends CoreEntity, R extends CoreRepository<E> = CoreRepository<E>> {

  protected constructor(protected repository: R) {
  }

  public get type(): Type<E> {
    return this.repository.target as Type<E>;
  }

  public async createOne(partial: DeepPartial<E>, request?: Request): Promise<E> {
    let created = await this.create(partial, request);
    return this.save(created, request);
  }

  public async findOneById(id: number, request?: Request): Promise<E> {
    return this.repository.findOneOrFail(id);
  }

  public async findMany(paging: Paging, request?: Request): Promise<Page<E>> {
    return this.repository.findMany(paging);
  }

  public async findAll(request?: Request): Promise<E[]> {
    return this.repository.find();
  }

  public async updateOne(entity: E, partial: DeepPartial<E>, request?: Request): Promise<E> {
    let merged = await this.merge(entity, partial, request);
    return this.save(merged, request);
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
    return plainToClass(this.type, partial);
  }

  public async merge(entity: E, partial: DeepPartial<E>, request?: Request): Promise<E> {
    return plainToClassFromExist(entity, partial);
  }

  public async save(entity: E, request?: Request): Promise<E> {
    return this.repository.save(entity as object);
  }

  public async remove(entity: E, request?: Request): Promise<E> {
    return this.repository.remove(entity);
  }

}
