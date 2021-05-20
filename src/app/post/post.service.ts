import {Injectable} from '@nestjs/common';
import {PropService} from '../../auth/prop/prop.service';
import {PostEntity} from './post.entity';
import {PostRepository} from './post.repository';

@Injectable()
export class PostService extends PropService<PostEntity> {

  public constructor(repository: PostRepository) {
    super(repository);
  }

}
