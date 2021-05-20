import {Column, Entity, ManyToOne} from 'typeorm';
import {CoreEntity} from '../../core/core.model';
import {RoleEntity} from './role.model';

@Entity('permissions')
export class PermissionEntity extends CoreEntity {

  @ManyToOne(() => RoleEntity, role => role.permissions)
  public role: RoleEntity;

  @Column()
  public feature: string;

  @Column()
  public action: string;

  @Column()
  public granted: boolean;

  @Column()
  public limited: boolean;

}
