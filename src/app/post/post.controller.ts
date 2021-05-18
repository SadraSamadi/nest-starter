import {ClassSerializerInterceptor, Controller, UseGuards, UseInterceptors} from '@nestjs/common';
import {Feature} from '../../auth/auth.decorator';
import {AuthGuard} from '../../auth/auth.guard';
import {PermissionGuard} from '../../auth/user/permission.guard';
import {CoreController} from '../../core/core.controller';
import {PostService} from './post.service';
import {PostEntity} from './post.entity';

@Feature('posts')
@Controller('posts')
@UseGuards(AuthGuard, PermissionGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PostController extends CoreController<PostEntity> {

  public constructor(service: PostService) {
    super(service);
  }

}
