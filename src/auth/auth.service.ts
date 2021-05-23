import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import argon2 from 'argon2';
import {plainToClass} from 'class-transformer';
import jwt from 'jsonwebtoken';
import {AuthConfig, Authorization, JwtPayload, LoginRequest, RegisterRequest, UpdateRequest} from './auth.model';
import {RoleService} from './user/role.service';
import {UserEntity, UserStatus} from './user/user.model';
import {UserService} from './user/user.service';

@Injectable()
export class AuthService {

  public constructor(private config: ConfigService<AuthConfig>,
                     private roleService: RoleService,
                     private userService: UserService) {
  }

  public async register(request: RegisterRequest): Promise<Authorization> {
    let user = await this.userService.createOne({
      username: request.username,
      email: request.email,
      password: request.password,
      role: await this.roleService.findOneByName(request.role),
      status: UserStatus.ACTIVE
    });
    return this.sign(user);
  }

  public async login(request: LoginRequest): Promise<Authorization> {
    let user = await this.userService.findOneByUsername(request.username);
    if (!user)
      throw new NotFoundException('user not found');
    if (request.role && user.role.name !== request.role)
      throw new UnauthorizedException('roles dont match');
    if (!await argon2.verify(user.password, request.password))
      throw new UnauthorizedException('wrong password');
    return this.sign(user);
  }

  public async findUser(user: UserEntity): Promise<UserEntity> {
    return user;
  }

  public async updateUser(user: UserEntity, request: UpdateRequest): Promise<UserEntity> {
    return this.userService.updateOne(user, {
      username: request.username,
      email: request.email,
      password: request.password
    });
  }

  private async sign(user: UserEntity): Promise<Authorization> {
    let secret = this.config.get('JWT_SECRET');
    let expiresIn = this.config.get('JWT_EXPIRES_IN');
    let prefix = this.config.get('AUTH_PREFIX');
    let subject = String(user.id);
    let token = jwt.sign({}, secret, {expiresIn, subject});
    return plainToClass(Authorization, {prefix, token});
  }

  public async verify(authorization: Authorization): Promise<UserEntity> {
    try {
      let secret = this.config.get('JWT_SECRET');
      let payload = jwt.verify(authorization.token, secret) as JwtPayload;
      let id = parseInt(payload.sub);
      return this.userService.findOneById(id);
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

}
