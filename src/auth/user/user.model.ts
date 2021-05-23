import {Exclude} from 'class-transformer';
import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {CoreEntity} from '../../core/core.model';
import {RoleEntity} from './role.model';

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
  @ManyToOne(() => RoleEntity)
  public role: RoleEntity;

  @Column({type: 'enum', enum: UserStatus})
  public status: UserStatus;

}
