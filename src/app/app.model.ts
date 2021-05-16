import {IsBoolean, IsNumber, IsString} from 'class-validator';
import {DatabaseType} from 'typeorm';

export class AppConfig {

  @IsBoolean()
  public DEBUG: boolean;

  @IsString()
  public PREFIX: string;

  @IsNumber()
  public PORT: number;

  @IsString()
  public DB_TYPE: DatabaseType;

  @IsString()
  public DB_HOST: string;

  @IsNumber()
  public DB_PORT: number;

  @IsString()
  public DB_NAME: string;

  @IsString()
  public DB_USER: string;

  @IsString()
  public DB_PASS: string;

  @IsString()
  public JWT_SECRET: string;

  @IsString()
  public JWT_EXPIRES_IN: string;

  @IsString()
  public AUTH_PREFIX: string;

}
