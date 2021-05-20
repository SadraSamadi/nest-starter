import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import _ from 'lodash';
import {getRequestPart, setRequestPart} from '../../core/core.util';
import {ACTION, ALL, FEATURE, PERMISSION, USER} from '../auth.constant';
import {UserEntity} from './user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {

  public constructor(private reflector: Reflector) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    let controller = context.getClass();
    let handler = context.getHandler();
    let feature = this.reflector.get<string>(FEATURE, controller);
    let action = this.reflector.get<string>(ACTION, handler);
    let user = getRequestPart<UserEntity>(context, USER);
    let permission =
      _.find(user.role.permissions, {feature, action}) ||
      _.find(user.role.permissions, {feature, action: ALL}) ||
      _.find(user.role.permissions, {feature: ALL, action}) ||
      _.find(user.role.permissions, {feature: ALL, action: ALL});
    if (!permission?.granted)
      return false;
    setRequestPart(context, PERMISSION, permission);
    return true;
  }

}
