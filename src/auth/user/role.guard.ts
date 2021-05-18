import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {getRequestPart} from '../../core/core.util';
import {ROLES, USER} from '../auth.constant';
import {UserEntity} from './user.entity';

@Injectable()
export class RoleGuard implements CanActivate {

  public constructor(private reflector: Reflector) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    let handler = context.getHandler();
    let controller = context.getClass();
    let roles = this.reflector.getAllAndOverride<string[]>(ROLES, [handler, controller]);
    let user = getRequestPart<UserEntity>(context, USER);
    return roles.includes(user.role.name);
  }

}
