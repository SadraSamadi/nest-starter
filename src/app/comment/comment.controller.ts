import {ClassSerializerInterceptor, Controller, UseGuards, UseInterceptors} from '@nestjs/common';
import {Feature} from '../../auth/auth.decorator';
import {AuthGuard} from '../../auth/auth.guard';
import {PermissionGuard} from '../../auth/user/permission.guard';
import {CoreController} from '../../core/core.controller';
import {CommentEntity} from './comment.entity';
import {CommentService} from './comment.service';

@Feature('comments')
@Controller('comments')
@UseGuards(AuthGuard, PermissionGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class CommentController extends CoreController<CommentEntity> {

  public constructor(service: CommentService) {
    super(service);
  }

}
