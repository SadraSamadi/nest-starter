import {Request} from 'express';
import {DeepPartial} from 'typeorm';
import {Page, Paging} from '../../core/core.model';
import {CoreRepository} from '../../core/core.repository';
import {CoreService} from '../../core/core.service';
import {PERMISSION, USER} from '../auth.constant';
import {PermissionEntity} from '../user/permission.model';
import {UserEntity} from '../user/user.model';
import {PropEntity} from './prop.model';

export abstract class PropService<P extends PropEntity, R extends CoreRepository<P> = CoreRepository<P>>
  extends CoreService<P, R> {

  protected constructor(repository: R) {
    super(repository);
  }

  public async findOne(request?: Request): Promise<P> {
    let limited = await this.limited(request);
    return this.repository.findOneOrFail(limited && {where: [limited]});
  }

  public async findOneById(id: number, request?: Request): Promise<P> {
    let limited = await this.limited(request);
    return this.repository.findOneOrFail(id, limited && {where: [limited]});
  }

  public async findMany(paging: Paging, request?: Request): Promise<Page<P>> {
    let limited = await this.limited(request);
    return this.repository.findMany(paging, limited && {where: [limited]});
  }

  public async findAll(request?: Request): Promise<P[]> {
    let limited = await this.limited(request);
    return this.repository.find(limited && {where: [limited]});
  }

  public async create(partial: DeepPartial<P>, request?: Request): Promise<P> {
    let limited = await this.limited(request);
    return super.create({...partial, ...limited}, request);
  }

  public async merge(entity: P, partial: DeepPartial<P>, request?: Request): Promise<P> {
    let limited = await this.limited(request);
    return super.merge(entity, {...partial, ...limited}, request);
  }

  protected async limited(request: Request): Promise<Pick<PropEntity, 'owner'>> {
    let owner = request?.[USER] as UserEntity;
    let permission = request?.[PERMISSION] as PermissionEntity;
    return permission?.limited ? {owner} : null;
  }

}
