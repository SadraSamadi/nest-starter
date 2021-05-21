import {Column, Entity, ManyToOne} from 'typeorm';
import {PropEntity} from '../../auth/prop/prop.model';
import {PostEntity} from '../post/post.model';
import {COMMENTS} from './comment.constant';

@Entity(COMMENTS)
export class CommentEntity extends PropEntity {

  @ManyToOne(() => PostEntity, {nullable: false})
  public post: PostEntity;

  @Column()
  public body: string;

}

export interface CommentFilter {

  postId: number;

}
