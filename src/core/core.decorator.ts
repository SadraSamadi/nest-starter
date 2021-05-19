import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {Request} from 'express';
import {PAYLOAD} from './core.constant';
import {Pageable} from './core.model';
import {getRequestPart} from './core.util';

export const PageableDefault = createParamDecorator((def: Partial<Pageable>, context: ExecutionContext) => {
  let http = context.switchToHttp();
  let request = http.getRequest<Request>();
  return Pageable.from(request.query, {page: 0, size: 20, sort: [], ...def});
});

export const Payload = createParamDecorator((data: never, context: ExecutionContext) => getRequestPart(context, PAYLOAD));
