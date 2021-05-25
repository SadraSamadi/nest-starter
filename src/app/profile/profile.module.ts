import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from '../../auth/auth.module';
import {AssetModule} from '../../common/asset/asset.module';
import {ProfileController} from './profile.controller';
import {ProfileRepository} from './profile.repository';
import {ProfileService} from './profile.service';

@Module({
  imports: [
    AuthModule,
    AssetModule,
    TypeOrmModule.forFeature([ProfileRepository])
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService]
})
export class ProfileModule {
}
