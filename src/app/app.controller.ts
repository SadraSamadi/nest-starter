import {ClassSerializerInterceptor, Controller, UseGuards, UseInterceptors} from '@nestjs/common';
import {Roles} from '../auth/auth.decorator';
import {AuthGuard} from '../auth/auth.guard';
import {RoleGuard} from '../auth/user/role.guard';
import {RoleEntity} from '../auth/user/role.model';
import {RoleService} from '../auth/user/role.service';
import {UserService} from '../auth/user/user.service';
import {UserEntity} from '../auth/user/user.entity';
import {CoreController} from '../core/core.controller';

@Roles('admin')
@Controller('roles')
@UseGuards(AuthGuard, RoleGuard)
export class RoleController extends CoreController<RoleEntity, RoleService> {

  public constructor(service: RoleService) {
    super(service);
  }

}

@Roles('admin')
@Controller('users')
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController extends CoreController<UserEntity, UserService> {

  public constructor(service: UserService) {
    super(service);
  }

}

@Controller()
export class AppController {

}
