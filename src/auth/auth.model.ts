import {IsString} from 'class-validator';
import {JoinColumn, ManyToOne} from 'typeorm';
import {CoreEntity} from '../core/core.model';
import {UserEntity} from './user/user.entity';

export class AuthConfig {

  @IsString()
  public JWT_SECRET: string;

  @IsString()
  public JWT_EXPIRES_IN: string;

  @IsString()
  public AUTH_PREFIX: string;

}

export abstract class PropEntity extends CoreEntity {

  @JoinColumn()
  @ManyToOne(() => UserEntity, {eager: true})
  public owner: UserEntity;

}

export class RegisterRequest {

  @IsString()
  public username: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public role: string;

}

export class LoginRequest {

  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  public role: string;

}

export class UpdateRequest {

  @IsString()
  public username: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

}

export class Authorization {

  @IsString()
  public prefix: string;

  @IsString()
  public token: string;

}

export interface JwtPayload {

  exp: number;

  nbf: number;

  aud: string | string[];

  sub: string;

  iss: string;

}
