import {ClassSerializerInterceptor, Controller, UseInterceptors} from '@nestjs/common';
import {CoreController} from '../../core/core.controller';
import {RoleEntity, UserEntity} from './user.model';
import {RoleService, UserService} from './user.service';

@Controller('roles')
export class RoleController extends CoreController<RoleEntity, RoleService> {

  public constructor(service: RoleService) {
    super(service);
  }

}

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController extends CoreController<UserEntity, UserService> {

  public constructor(service: UserService) {
    super(service);
  }

}
