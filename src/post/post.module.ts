import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostController} from './post.controller';
import {PostRepository} from './post.repository';
import {PostService} from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {
}
