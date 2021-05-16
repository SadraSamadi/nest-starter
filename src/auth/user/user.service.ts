import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import argon2 from 'argon2';
import {DeepPartial, Repository} from 'typeorm';
import {CoreService} from '../../core/core.service';
import {RoleEntity, UserEntity} from './user.model';

@Injectable()
export class RoleService extends CoreService<RoleEntity> {

  public constructor(@InjectRepository(RoleEntity) repository: Repository<RoleEntity>) {
    super(repository);
  }

  public async createOneByName(name: string): Promise<RoleEntity> {
    return this.createOne({name});
  }

  public async createManyByNames(...names: string[]): Promise<RoleEntity[]> {
    let roles = names.map<DeepPartial<RoleEntity>>(name => ({name}));
    return this.createMany(roles);
  }

  public async findOneByName(name: string): Promise<RoleEntity> {
    return this.repository.findOne({name});
  }

}

@Injectable()
export class UserService extends CoreService<UserEntity> {

  public constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
    super(repository);
  }

  public async createOne(partial: DeepPartial<UserEntity>): Promise<UserEntity> {
    await this.hash(partial);
    return super.createOne(partial);
  }

  public async createMany(partials: DeepPartial<UserEntity>[]): Promise<UserEntity[]> {
    for (let partial of partials)
      await this.hash(partial);
    return super.createMany(partials);
  }

  public async updateOneById(id: number, partial: DeepPartial<UserEntity>): Promise<UserEntity> {
    await this.hash(partial);
    return super.updateOneById(id, partial);
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
