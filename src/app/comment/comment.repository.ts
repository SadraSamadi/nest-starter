import {EntityRepository} from 'typeorm';
import {CoreRepository} from '../../core/core.repository';
import {CommentEntity} from './comment.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends CoreRepository<CommentEntity> {

}
