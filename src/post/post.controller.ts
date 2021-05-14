import {Controller} from '@nestjs/common';
import {Crud} from '@nestjsx/crud';
import {CoreController} from '../core/core.controller';
import {PostEntity} from './post.entity';
import {PostService} from './post.service';

@Crud({
  model: {
    type: PostEntity
  }
})
@Controller('posts')
export class PostController extends CoreController<PostEntity, PostService> {

  public constructor(service: PostService) {
    super(service);
  }

}
