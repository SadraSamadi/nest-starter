import {EntityRepository} from 'typeorm';
import {CoreRepository} from '../../core/core.repository';
import {PostEntity} from './post.model';

@EntityRepository(PostEntity)
export class PostRepository extends CoreRepository<PostEntity> {

}
