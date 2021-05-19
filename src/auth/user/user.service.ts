import {Injectable} from '@nestjs/common';
import argon2 from 'argon2';
import {DeepPartial} from 'typeorm';
import {RequestPayload} from '../../core/core.model';
import {CoreService} from '../../core/core.service';
import {UserEntity} from './user.entity';
import {UserRepository} from './user.repository';

@Injectable()
export class UserService extends CoreService<UserEntity> {

  public constructor(repository: UserRepository) {
    super(repository);
  }

  public async findOneById(id: number, payload?: RequestPayload<UserEntity>): Promise<UserEntity> {
    return super.findOneById(id, {
      ...payload,
      options: {
        ...payload?.options,
        relations: ['role']
      }
    });
  }

  public async findOneByUsername(username: string): Promise<UserEntity> {
    return this.repository.findOne({
      where: [
        {username},
        {email: username}
      ]
    });
  }

  public async create(partial: DeepPartial<UserEntity>, payload?: RequestPayload<UserEntity>): Promise<UserEntity> {
    await this.hash(partial);
    return super.create(partial, payload);
  }

  public async merge(entity: UserEntity, partial: DeepPartial<UserEntity>, payload?: RequestPayload<UserEntity>): Promise<UserEntity> {
    await this.hash(partial);
    return super.merge(entity, partial, payload);
  }

  private async hash(partial: DeepPartial<UserEntity>): Promise<void> {
    if (partial.password)
      partial.password = await argon2.hash(partial.password);
  }

}
