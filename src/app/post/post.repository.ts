import {EntityRepository} from 'typeorm';
import {CoreRepository} from '../../core/core.repository';
import {PostEntity} from './post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends CoreRepository<PostEntity> {

}
