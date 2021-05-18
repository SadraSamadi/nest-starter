import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import argon2 from 'argon2';
import {DeepPartial, Repository} from 'typeorm';
import {RequestPayload} from '../../core/core.model';
import {CoreService} from '../../core/core.service';
import {UserEntity} from './user.entity';

@Injectable()
export class UserService extends CoreService<UserEntity> {

  public constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
    super(repository);
  }

  public async createOne(partial: DeepPartial<UserEntity>, payload?: RequestPayload<UserEntity>): Promise<UserEntity> {
    await this.hash(partial);
    return super.createOne(partial, payload);
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

  public async updateOneById(id: number, partial: DeepPartial<UserEntity>, payload?: RequestPayload<UserEntity>): Promise<UserEntity> {
    await this.hash(partial);
    return super.updateOneById(id, partial, payload);
  }

  public async findOneByUsername(username: string): Promise<UserEntity> {
    return this.repository.findOne({
      where: [
        {username},
        {email: username}
      ]
    });
  }

  private async hash(partial: DeepPartial<UserEntity>): Promise<void> {
    if (partial.password)
      partial.password = await argon2.hash(partial.password);
  }

}
