import {Column, Entity} from 'typeorm';
import {PropEntity} from '../../auth/auth.model';

@Entity('posts')
export class PostEntity extends PropEntity {

  @Column()
  public title: string;

  @Column()
  public body: string;

}
