import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {Request} from 'express';
import {setRequestPart} from '../core/core.util';
import {USER} from './auth.constant';
import {Authorization} from './auth.model';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(private service: AuthService) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    let http = context.switchToHttp();
    let request = http.getRequest<Request>();
    let header = request.headers.authorization || ' ';
    let [prefix, token] = header.split(' ');
    let auth = plainToClass(Authorization, {prefix, token});
    let user = await this.service.verify(auth);
    setRequestPart(context, USER, user);
    return true;
  }

}

