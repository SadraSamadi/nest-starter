import {Column, Entity} from 'typeorm';
import {PropEntity} from '../../auth/prop/prop.model';
import {POSTS} from './post.constant';

@Entity(POSTS)
export class PostEntity extends PropEntity {

  @Column()
  public title: string;

  @Column()
  public body: string;

}
