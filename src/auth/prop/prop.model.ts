import {JoinColumn, ManyToOne} from 'typeorm';
import {CoreEntity} from '../../core/core.model';
import {UserEntity} from '../user/user.entity';

export abstract class PropEntity extends CoreEntity {

  @JoinColumn()
  @ManyToOne(() => UserEntity, {eager: true})
  public owner: UserEntity;

}
