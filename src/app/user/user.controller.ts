import {ClassSerializerInterceptor, Controller, UseGuards, UseInterceptors} from '@nestjs/common';
import {Roles} from '../../auth/auth.decorator';
import {AuthGuard} from '../../auth/auth.guard';
import {RoleGuard} from '../../auth/user/role.guard';
import {UserEntity} from '../../auth/user/user.model';
import {UserService} from '../../auth/user/user.service';
import {CoreController} from '../../core/core.controller';

@Roles('admin')
@Controller('users')
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController extends CoreController<UserEntity, UserService> {

  public constructor(service: UserService) {
    super(service);
  }

}
