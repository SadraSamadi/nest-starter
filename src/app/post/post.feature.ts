import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from '../../auth/auth.module';
import {PostService} from './post.service';
import {PostController} from './post.controller';
import {PostEntity} from './post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    AuthModule
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService]
})
export class PostModule {
}
