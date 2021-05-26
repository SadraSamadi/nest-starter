import {IsString} from 'class-validator';
import {AuthConfig} from '../auth/auth.model';
import {AssetConfig} from '../common/asset/asset.model';
import {CoreConfig} from '../core/core.model';
import {IntersectionTypes} from '../core/core.util';

export class AppConfig extends IntersectionTypes(CoreConfig, AuthConfig, AssetConfig) {

}

export class Externals {

  @IsString()
  public cdn: string;

}
