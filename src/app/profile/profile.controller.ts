import {ClassSerializerInterceptor, Controller, UseGuards, UseInterceptors} from '@nestjs/common';
import {Feature} from '../../auth/auth.decorator';
import {AuthGuard} from '../../auth/auth.guard';
import {PropController} from '../../auth/prop/prop.controller';
import {PermissionGuard} from '../../auth/user/permission.guard';
import {PROFILES} from './profile.constant';
import {ProfileEntity} from './profile.model';
import {ProfileService} from './profile.service';

@Feature(PROFILES)
@Controller(PROFILES)
@UseGuards(AuthGuard, PermissionGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController extends PropController<ProfileEntity> {

  public constructor(service: ProfileService) {
    super(service);
  }

}
