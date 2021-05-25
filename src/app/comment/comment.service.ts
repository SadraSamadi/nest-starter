import {Injectable} from '@nestjs/common';
import {Request} from 'express';
import {PropService} from '../../auth/prop/prop.service';
import {Page, Paging} from '../../core/core.model';
import {CommentEntity, CommentFilter} from './comment.model';
import {CommentRepository} from './comment.repository';

@Injectable()
export class CommentService extends PropService<CommentEntity> {

  public constructor(repository: CommentRepository) {
    super(repository);
  }

  public async filter(filter: CommentFilter, paging: Paging, request?: Request): Promise<Page<CommentEntity>> {
    let limited = await this.limited(request);
    return this.repository.findMany(paging, {where: [{...limited, post: {id: filter.postId}}]});
  }

}
