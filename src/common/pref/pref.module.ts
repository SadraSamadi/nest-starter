import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PrefRepository} from './pref.repository';
import {PrefService} from './pref.service';

@Module({
  imports: [TypeOrmModule.forFeature([PrefRepository])],
  providers: [PrefService],
  exports: [PrefService]
})
export class PrefModule {
}

