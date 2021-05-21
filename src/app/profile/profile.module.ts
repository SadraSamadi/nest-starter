import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from '../../auth/auth.module';
import {ProfileController} from './profile.controller';
import {ProfileRepository} from './profile.repository';
import {ProfileService} from './profile.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ProfileRepository])
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService]
})
export class ProfileModule {
}
