import {createParamDecorator, ExecutionContext, SetMetadata} from '@nestjs/common';
import {Request} from 'express';
import {ROLES, USER} from './auth.constant';

export const User = createParamDecorator((data: never, context: ExecutionContext) => {
  let http = context.switchToHttp();
  let request = http.getRequest<Request>();
  return request[USER];
});

export const Roles = (...roles: string[]) => SetMetadata(ROLES, roles);
