import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PrefEntity} from './pref.model';
import {PrefService} from './pref.service';

@Module({
  imports: [TypeOrmModule.forFeature([PrefEntity])],
  providers: [PrefService],
  exports: [PrefService]
})
export class PrefModule {
}
