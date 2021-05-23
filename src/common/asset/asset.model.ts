import {IsString} from 'class-validator';
import {Column, Entity} from 'typeorm';
import {PropEntity} from '../../auth/prop/prop.model';
import {ASSETS} from './asset.constant';

export class AssetConfig {

  @IsString()
  public ASSET_STORAGE: string;

  @IsString()
  public ASSET_CDN: string;

}

export enum AssetLocation {

  INTERNAL = 'INTERNAL',

  EXTERNAL = 'EXTERNAL'

}

@Entity(ASSETS)
export class AssetEntity extends PropEntity {

  @Column({type: 'enum', enum: AssetLocation})
  public location: AssetLocation;

  @Column({nullable: true})
  public name: string;

  @Column({nullable: true})
  public type: string;

  @Column({nullable: true})
  public hash: string;

  @Column({nullable: true})
  public ext: string;

  @Column({nullable: true})
  public uri: string;

}
