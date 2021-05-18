import {ClassSerializerInterceptor, Controller, Injectable, Module, UseGuards, UseInterceptors} from '@nestjs/common';
import {InjectRepository, TypeOrmModule} from '@nestjs/typeorm';
import {Column, Entity, Repository} from 'typeorm';
import {Feature} from '../auth/auth.decorator';
import {AuthGuard} from '../auth/auth.guard';
import {PropEntity} from '../auth/auth.model';
import {AuthModule} from '../auth/auth.module';
import {PermissionGuard} from '../auth/user/permission.guard';
import {CoreController} from '../core/core.controller';
import {CoreService} from '../core/core.service';

@Entity('posts')
export class PostEntity extends PropEntity {

  @Column()
  public title: string;

  @Column()
  public body: string;

}

@Injectable()
export class PostService extends CoreService<PostEntity> {

  public constructor(@InjectRepository(PostEntity) repository: Repository<PostEntity>) {
    super(repository);
  }

}

@Feature('posts')
@Controller('posts')
@UseGuards(AuthGuard, PermissionGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PostController extends CoreController<PostEntity> {

  public constructor(service: PostService) {
    super(service);
  }

}

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
