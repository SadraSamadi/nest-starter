import {IsString} from 'class-validator';

export class AuthConfig {

  @IsString()
  public JWT_PREFIX: string;

  @IsString()
  public JWT_SECRET: string;

  @IsString()
  public JWT_EXPIRES_IN: string;

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
