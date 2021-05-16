import {IsString} from 'class-validator';

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
