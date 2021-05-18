import {Column, Entity, OneToMany} from 'typeorm';
import {CoreEntity} from '../../core/core.model';
import {PermissionEntity} from './permission.model';

@Entity('roles')
export class RoleEntity extends CoreEntity {

  @Column({unique: true})
  public name: string;

  @OneToMany(() => PermissionEntity, permission => permission.role, {cascade: true, eager: true})
  public permissions: PermissionEntity[];

}
