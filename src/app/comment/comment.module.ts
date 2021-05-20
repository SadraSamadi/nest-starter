import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from '../../auth/auth.module';
import {CommentController} from './comment.controller';
import {CommentRepository} from './comment.repository';
import {CommentService} from './comment.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CommentRepository])
  ],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {
}
