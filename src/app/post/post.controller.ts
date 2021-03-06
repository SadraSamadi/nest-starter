import {ClassSerializerInterceptor, Controller, UseGuards, UseInterceptors} from '@nestjs/common';
import {Feature} from '../../auth/auth.decorator';
import {AuthGuard} from '../../auth/auth.guard';
import {PropController} from '../../auth/prop/prop.controller';
import {PermissionGuard} from '../../auth/user/permission.guard';
import {POSTS} from './post.constant';
import {PostEntity} from './post.model';
import {PostService} from './post.service';

@Feature(POSTS)
@Controller(POSTS)
@UseGuards(AuthGuard, PermissionGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PostController extends PropController<PostEntity> {

  public constructor(service: PostService) {
    super(service);
  }

}
