import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {plainToClass} from 'class-transformer';
import {Request} from 'express';
import _ from 'lodash';
import {ROLES, USER} from './auth.constant';
import {Authorization} from './auth.model';
import {AuthService} from './auth.service';
import {UserEntity} from './user/user.model';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(private service: AuthService) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    let host = context.switchToHttp();
    let request = host.getRequest<Request>();
    let header = request.headers.authorization || ' ';
    let [prefix, token] = header.split(' ');
    let authorization = plainToClass(Authorization, {prefix, token});
    request[USER] = await this.service.verify(authorization);
    return true;
  }

}

@Injectable()
export class RoleGuard implements CanActivate {

  public constructor(private reflector: Reflector) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    let type = context.getClass();
    let handler = context.getHandler();
    let roles = this.reflector.getAllAndOverride<string[]>(ROLES, [type, handler]);
    let http = context.switchToHttp();
    let request = http.getRequest<Request>();
    let user = request[USER] as UserEntity;
    return _.includes(roles, user.role.name);
  }

}
