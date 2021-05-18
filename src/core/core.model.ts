import {Transform} from 'class-transformer';
import {IsBoolean, IsNumber, IsString} from 'class-validator';
import {CreateDateColumn, DatabaseType, FindOneOptions, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {parseBoolean} from './core.util';

export class CoreConfig {

  @IsBoolean()
  @Transform(parseBoolean)
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

  @IsBoolean()
  @Transform(parseBoolean)
  public DB_LOGG: boolean;

}

export abstract class CoreEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;

}

export interface RequestPayload<E extends CoreEntity> {

  one: Partial<E>;

  options: FindOneOptions<E>;

}
