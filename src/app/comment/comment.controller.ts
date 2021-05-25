import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {Request} from 'express';
import {READ} from '../../auth/auth.constant';
import {Action, Feature} from '../../auth/auth.decorator';
import {AuthGuard} from '../../auth/auth.guard';
import {PropController} from '../../auth/prop/prop.controller';
import {PermissionGuard} from '../../auth/user/permission.guard';
import {Pageable} from '../../core/core.decorator';
import {Page, Paging} from '../../core/core.model';
import {COMMENTS} from './comment.constant';
import {CommentEntity} from './comment.model';
import {CommentService} from './comment.service';

@Feature(COMMENTS)
@Controller(COMMENTS)
@UseGuards(AuthGuard, PermissionGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class CommentController extends PropController<CommentEntity, CommentService> {

  public constructor(service: CommentService) {
    super(service);
  }

  @Get('filter')
  @Action(READ)
  public async filter(@Query('postId', ParseIntPipe) postId: number,
                      @Pageable() paging: Paging,
                      @Req() request: Request): Promise<Page<CommentEntity>> {
    return this.service.filter({postId}, paging, request);
  }

}
