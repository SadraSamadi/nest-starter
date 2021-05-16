import {ClassConstructor, plainToClass, plainToClassFromExist} from 'class-transformer';
import {DeepPartial, Repository} from 'typeorm';
import {CoreEntity} from './core.entity';

export abstract class CoreService<E extends CoreEntity, R extends Repository<E> = Repository<E>> {

  public get type(): ClassConstructor<E> {
    return this.repository.target as ClassConstructor<E>;
  }

  protected constructor(protected repository: R) {
  }

  public async createOne(partial: DeepPartial<E>): Promise<E> {
    let entity = plainToClass(this.type, partial);
    return this.repository.save(entity as object);
  }

  public async createMany(partials: DeepPartial<E>[]): Promise<E[]> {
    let entities = plainToClass(this.type, partials);
    return this.repository.save(entities as object[]);
  }

  public async findOneById(id: number): Promise<E> {
    return this.repository.findOne(id);
  }

  public async findMany(skip: number, take: number): Promise<[E[], number]> {
    return this.repository.findAndCount({skip, take});
  }

  public async findAll(): Promise<E[]> {
    return this.repository.find();
  }

  public async updateOneById(id: number, partial: DeepPartial<E>): Promise<E> {
    let entity = await this.repository.findOne(id);
    entity = plainToClassFromExist(entity, partial);
    return this.repository.save(entity as object);
  }

  public async deleteOneById(id: number): Promise<E> {
    let entity = await this.repository.findOne(id);
    return this.repository.remove(entity);
  }

}
