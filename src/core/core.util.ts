import {ExecutionContext} from '@nestjs/common';
import {TransformFnParams} from 'class-transformer';
import {Request} from 'express';

export function parseBoolean(params: TransformFnParams): boolean {
  let value = params.obj[params.key];
  return JSON.parse(value);
}

export function setRequestPart<T>(context: ExecutionContext, part: string | symbol, value: T): void {
  let http = context.switchToHttp();
  let request = http.getRequest<Request>();
  request[part] = value;
}

export function getRequestPart<T>(context: ExecutionContext, part: string | symbol): T {
  let http = context.switchToHttp();
  let request = http.getRequest<Request>();
  return request[part];
}
