import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import _ from 'lodash';
import {PAYLOAD} from '../../core/core.constant';
import {RequestPayload} from '../../core/core.model';
import {getRequestPart, setRequestPart} from '../../core/core.util';
import {ACTION, ALL, FEATURE, USER} from '../auth.constant';
import {PropEntity} from '../auth.model';
import {UserEntity} from './user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {

  public constructor(private reflector: Reflector) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    let handler = context.getHandler();
    let controller = context.getClass();
    let action = this.reflector.get<string>(ACTION, handler);
    let feature = this.reflector.get<string>(FEATURE, controller);
    let user = getRequestPart<UserEntity>(context, USER);
    let permission =
      _.find(user.role.permissions, {feature, action}) ||
      _.find(user.role.permissions, {feature, action: ALL}) ||
      _.find(user.role.permissions, {feature: ALL, action}) ||
      _.find(user.role.permissions, {feature: ALL, action: ALL});
    if (!permission)
      return false;
    let payload = getRequestPart<RequestPayload<PropEntity>>(context, PAYLOAD);
    if (permission.limited)
      setRequestPart<RequestPayload<PropEntity>>(context, PAYLOAD, {
        ...payload,
        one: {
          ...payload?.one,
          owner: user
        },
        options: {
          ...payload?.options,
          where: [
            {owner: user}
          ]
        }
      });
    return true;
  }

}
