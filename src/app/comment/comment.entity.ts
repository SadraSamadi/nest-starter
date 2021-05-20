import {Column, Entity, ManyToOne} from 'typeorm';
import {PropEntity} from '../../auth/prop/prop.model';
import {PostEntity} from '../post/post.entity';

@Entity('comments')
export class CommentEntity extends PropEntity {

  @ManyToOne(() => PostEntity)
  public post: PostEntity;

  @Column()
  public body: string;

}
