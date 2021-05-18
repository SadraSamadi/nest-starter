import {createParamDecorator, ExecutionContext, SetMetadata} from '@nestjs/common';
import {getRequestPart} from '../core/core.util';
import {ACTION, FEATURE, ROLES, USER} from './auth.constant';

export const Roles = (...roles: string[]) => SetMetadata(ROLES, roles);

export const Feature = (feature: string) => SetMetadata(FEATURE, feature);

export const Action = (action: string) => SetMetadata(ACTION, action);

export const User = createParamDecorator((data: never, context: ExecutionContext) => getRequestPart(context, USER));