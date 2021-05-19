import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from '../../auth/auth.module';
import {PostController} from './post.controller';
import {PostRepository} from './post.repository';
import {PostService} from './post.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PostRepository])
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService]
})
export class PostModule {
}
