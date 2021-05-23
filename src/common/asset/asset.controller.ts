import {
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {Request} from 'express';
import {CREATE} from '../../auth/auth.constant';
import {Action, Feature} from '../../auth/auth.decorator';
import {AuthGuard} from '../../auth/auth.guard';
import {PropController} from '../../auth/prop/prop.controller';
import {PermissionGuard} from '../../auth/user/permission.guard';
import {ASSETS} from './asset.constant';
import {AssetInterceptor} from './asset.interceptor';
import {AssetEntity} from './asset.model';
import {AssetService} from './asset.service';

@Feature(ASSETS)
@Controller(ASSETS)
@UseGuards(AuthGuard, PermissionGuard)
@UseInterceptors(ClassSerializerInterceptor, AssetInterceptor)
export class AssetController extends PropController<AssetEntity, AssetService> {

  public constructor(service: AssetService) {
    super(service);
  }

  @Post('file')
  @Action(CREATE)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  public async createFile(@UploadedFile() file: Express.Multer.File,
                          @Req() request: Request): Promise<AssetEntity> {
    return this.service.createFile(file, request);
  }

  @Patch('file/:id')
  @Action(CREATE)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  public async updateFileById(@Param('id', ParseIntPipe) id: number,
                              @UploadedFile() file: Express.Multer.File,
                              @Req() request: Request): Promise<AssetEntity> {
    return this.service.updateFileById(id, file, request);
  }

}
