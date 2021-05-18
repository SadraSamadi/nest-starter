import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CoreService} from '../../core/core.service';
import {PostEntity} from './post.entity';

@Injectable()
export class PostService extends CoreService<PostEntity> {

  public constructor(@InjectRepository(PostEntity) repository: Repository<PostEntity>) {
    super(repository);
  }

}
