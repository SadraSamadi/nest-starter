import {Injectable} from '@nestjs/common';
import {CoreService} from '../../core/core.service';
import {PostEntity} from './post.entity';
import {PostRepository} from './post.repository';

@Injectable()
export class PostService extends CoreService<PostEntity> {

  public constructor(repository: PostRepository) {
    super(repository);
  }

}
