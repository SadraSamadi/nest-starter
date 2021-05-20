import {Column, Entity} from 'typeorm';
import {PropEntity} from '../../auth/prop/prop.model';

@Entity('posts')
export class PostEntity extends PropEntity {

  @Column()
  public title: string;

  @Column()
  public body: string;

}
