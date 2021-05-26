import {Injectable} from '@nestjs/common';
import argon2 from 'argon2';
import {Request} from 'express';
import {DeepPartial} from 'typeorm';
import {CoreService} from '../../core/core.service';
import {UserEntity} from './user.model';
import {UserRepository} from './user.repository';

@Injectable()
export class UserService extends CoreService<UserEntity> {

  public constructor(repository: UserRepository) {
    super(repository);
  }

  public async findOneById(id: number, request?: Request): Promise<UserEntity> {
    return this.repository.findOneOrFail(id, {relations: ['role']});
  }

  public async findOneByUsername(username: string): Promise<UserEntity> {
    return this.repository.findOne({
      relations: ['role'],
      where: [
        {username},
        {email: username}
      ]
    });
  }

  public async create(partial: DeepPartial<UserEntity>, request?: Request): Promise<UserEntity> {
    await this.hash(partial);
    return super.create(partial, request);
  }

  public async merge(entity: UserEntity, partial: DeepPartial<UserEntity>, request?: Request): Promise<UserEntity> {
    await this.hash(partial);
    return super.merge(entity, partial, request);
  }

  private async hash(partial: DeepPartial<UserEntity>): Promise<void> {
    if (partial.password)
      partial.password = await argon2.hash(partial.password);
  }

}
