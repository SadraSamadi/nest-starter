import {Injectable} from '@nestjs/common';
import {Request} from 'express';
import {FindConditions} from 'typeorm';
import {PropService} from '../../auth/prop/prop.service';
import {CONDITIONS} from '../../core/core.constant';
import {Page, Paging} from '../../core/core.model';
import {CommentEntity, CommentFilter} from './comment.model';
import {CommentRepository} from './comment.repository';

@Injectable()
export class CommentService extends PropService<CommentEntity> {

  public constructor(repository: CommentRepository) {
    super(repository);
  }

  public async filter(filter: CommentFilter, paging: Paging, request?: Request): Promise<Page<CommentEntity>> {
    await this.limit(request);
    let conditions = request?.[CONDITIONS] as FindConditions<CommentEntity>;
    return this.repository.findMany(paging, {where: [{...conditions, post: {id: filter.postId}}]});
  }

}
