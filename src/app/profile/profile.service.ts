import {Injectable} from '@nestjs/common';
import {PropService} from '../../auth/prop/prop.service';
import {ProfileEntity} from './profile.model';
import {ProfileRepository} from './profile.repository';

@Injectable()
export class ProfileService extends PropService<ProfileEntity> {

  public constructor(repository: ProfileRepository) {
    super(repository);
  }

}
