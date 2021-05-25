import {ExecutionContext, Type} from '@nestjs/common';
import {MappedType} from '@nestjs/mapped-types';
import {IntersectionType} from '@nestjs/swagger';
import {TransformFnParams} from 'class-transformer';
import {Request} from 'express';

export function IntersectionTypes(...types: Type[]): MappedType<any> {
  return types.reduce(IntersectionType);
}

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
