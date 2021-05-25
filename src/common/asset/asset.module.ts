import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from '../../auth/auth.module';
import {AssetController} from './asset.controller';
import {AssetInterceptor} from './asset.interceptor';
import {AssetRepository} from './asset.repository';
import {AssetService} from './asset.service';

@Module({
  imports: [ConfigModule, AuthModule, TypeOrmModule.forFeature([AssetRepository])],
  providers: [AssetService, AssetInterceptor],
  controllers: [AssetController],
  exports: [AssetService]
})
export class AssetModule {
}
