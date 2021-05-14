import {Column, Entity} from 'typeorm';
import {CoreEntity} from '../core/core.entity';

@Entity('post')
export class PostEntity extends CoreEntity {

  @Column()
  public userId: number;

  @Column()
  public title: string;

  @Column()
  public body: string;

}
