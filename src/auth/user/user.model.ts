import {Exclude} from 'class-transformer';
import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';
import {CoreEntity} from '../../core/core.entity';

@Entity('roles')
export class RoleEntity extends CoreEntity {

  @Column({unique: true})
  public name: string;

}

export enum UserStatus {

  INACTIVE = 'INACTIVE',

  ACTIVE = 'ACTIVE'

}

@Entity('users')
export class UserEntity extends CoreEntity {

  @Column({unique: true})
  public username: string;

  @Column({unique: true})
  public email: string;

  @Column()
  @Exclude({toPlainOnly: true})
  public password: string;

  @JoinColumn()
  @OneToOne(() => RoleEntity, {eager: true})
  public role: RoleEntity;

  @Column({type: 'enum', enum: UserStatus})
  public status: UserStatus;

}
