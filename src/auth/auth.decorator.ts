import {createParamDecorator, ExecutionContext, SetMetadata} from '@nestjs/common';
import {getRequestPart} from '../core/core.util';
import {ACTION, FEATURE, PERMISSION, ROLES, USER} from './auth.constant';

export const User = createParamDecorator((data: never, context: ExecutionContext) => getRequestPart(context, USER));

export const Roles = (...roles: string[]) => SetMetadata(ROLES, roles);

export const Feature = (feature: string) => SetMetadata(FEATURE, feature);

export const Action = (action: string) => SetMetadata(ACTION, action);

export const Permission = createParamDecorator((data: never, context: ExecutionContext) => getRequestPart(context, PERMISSION));
