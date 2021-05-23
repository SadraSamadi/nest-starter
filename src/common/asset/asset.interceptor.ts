import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OneOrMany, Page} from '../../core/core.model';
import {AssetConfig, AssetEntity, AssetLocation} from './asset.model';

@Injectable()
export class AssetInterceptor implements NestInterceptor<OneOrMany<AssetEntity>, OneOrMany<AssetEntity>> {

  public constructor(private config: ConfigService<AssetConfig>) {
  }

  public intercept(context: ExecutionContext, next: CallHandler<OneOrMany<AssetEntity>>): Observable<OneOrMany<AssetEntity>> {
    return next.handle()
      .pipe(map(value => {
        if (value instanceof AssetEntity)
          this.setUri(value);
        else if (value instanceof Array && value.every(item => item instanceof AssetEntity))
          for (let asset of value)
            this.setUri(asset);
        else if (value instanceof Page && value.items.every(item => item instanceof AssetEntity))
          for (let asset of value.items)
            this.setUri(asset);
        return value;
      }));
  }

  private setUri(asset: AssetEntity): void {
    if (asset.location !== AssetLocation.INTERNAL)
      return;
    let cdn = this.config.get('ASSET_CDN', '#');
    asset.uri = `${cdn}/${asset.hash}`;
  }

}
