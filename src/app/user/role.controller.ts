import {ClassSerializerInterceptor, Controller, UseGuards, UseInterceptors} from '@nestjs/common';
import {Roles} from '../../auth/auth.decorator';
import {AuthGuard} from '../../auth/auth.guard';
import {RoleGuard} from '../../auth/user/role.guard';
import {RoleEntity} from '../../auth/user/role.model';
import {RoleService} from '../../auth/user/role.service';
import {CoreController} from '../../core/core.controller';

@Roles('admin')
@Controller('roles')
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class RoleController extends CoreController<RoleEntity, RoleService> {

  public constructor(service: RoleService) {
    super(service);
  }

}
