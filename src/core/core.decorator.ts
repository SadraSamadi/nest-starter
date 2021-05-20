import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {Request} from 'express';
import {Paging} from './core.model';

export const Pageable = createParamDecorator((def: Partial<Paging>, context: ExecutionContext) => {
  let http = context.switchToHttp();
  let request = http.getRequest<Request>();
  return Paging.from(request.query, {page: 0, size: 20, sort: [], ...def});
});
