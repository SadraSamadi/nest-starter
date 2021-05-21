import {Request} from 'express';
import {DeepPartial, FindConditions} from 'typeorm';
import {ATTACHMENT, CONDITIONS} from '../../core/core.constant';
import {Page, Paging} from '../../core/core.model';
import {CoreRepository} from '../../core/core.repository';
import {CoreService} from '../../core/core.service';
import {PERMISSION, USER} from '../auth.constant';
import {PermissionEntity} from '../user/permission.model';
import {UserEntity} from '../user/user.entity';
import {PropEntity} from './prop.model';

export abstract class PropService<P extends PropEntity, R extends CoreRepository<P> = CoreRepository<P>>
  extends CoreService<P, R> {

  protected constructor(repository: R) {
    super(repository);
  }

  public async findOne(request?: Request): Promise<P> {
    await this.limit(request);
    let conditions = request?.[CONDITIONS] as FindConditions<P>;
    return this.repository.findOneOrFail(conditions ? {where: [conditions]} : null);
  }

  public async findOneById(id: number, request?: Request): Promise<P> {
    await this.limit(request);
    return super.findOneById(id, request);
  }

  public async findMany(paging: Paging, request?: Request): Promise<Page<P>> {
    await this.limit(request);
    return super.findMany(paging, request);
  }

  public async findAll(request?: Request): Promise<P[]> {
    await this.limit(request);
    return super.findAll(request);
  }

  public async create(partial: DeepPartial<P>, request?: Request): Promise<P> {
    await this.limit(request);
    return super.create(partial, request);
  }

  public async merge(entity: P, partial: DeepPartial<P>, request?: Request): Promise<P> {
    await this.limit(request);
    return super.merge(entity, partial, request);
  }

  public async limit(request: Request): Promise<void> {
    let attachment = request?.[ATTACHMENT] as P;
    let conditions = request?.[CONDITIONS] as FindConditions<P>;
    let user = request?.[USER] as UserEntity;
    let permission = request?.[PERMISSION] as PermissionEntity;
    if (!permission?.limited)
      return;
    request[ATTACHMENT] = {...attachment, owner: user} as P;
    request[CONDITIONS] = {...conditions, owner: user} as FindConditions<P>;
  }

}
