import {Injectable} from '@nestjs/common';
import {Request} from 'express';
import {PropService} from '../../auth/prop/prop.service';
import {CommentEntity} from './comment.entity';
import {CommentRepository} from './comment.repository';

@Injectable()
export class CommentService extends PropService<CommentEntity> {

  public constructor(repository: CommentRepository) {
    super(repository);
  }

  // TODO: different limitation for author
  public async limit(request: Request): Promise<void> {
    return super.limit(request);
  }

}
