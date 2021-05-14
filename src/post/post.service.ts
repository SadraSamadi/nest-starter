import {Injectable, OnModuleInit} from '@nestjs/common';
import faker from 'faker';
import _ from 'lodash';
import {DeepPartial} from 'typeorm';
import {CoreService} from '../core/core.service';
import {PostEntity} from './post.entity';
import {PostRepository} from './post.repository';

@Injectable()
export class PostService extends CoreService<PostEntity, PostRepository> implements OnModuleInit {

  public constructor(repository: PostRepository) {
    super(repository);
  }

  public async onModuleInit(): Promise<void> {
    let posts: DeepPartial<PostEntity>[] = _.range(100)
      .map(() => ({
        userId: faker.datatype.number({min: 1, max: 10}),
        title: faker.name.title(),
        body: faker.lorem.sentence()
      }));
    let entities = this.repository.create(posts);
    await this.repository.insert(entities);
  }

}
