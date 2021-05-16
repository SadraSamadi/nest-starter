import {Controller, Injectable, Module, UseGuards} from '@nestjs/common';
import {InjectRepository, TypeOrmModule} from '@nestjs/typeorm';
import {Column, Entity, ManyToOne, Repository} from 'typeorm';
import {Roles} from '../auth/auth.decorator';
import {AuthGuard, RoleGuard} from '../auth/auth.guard';
import {AuthModule} from '../auth/auth.module';
import {UserEntity} from '../auth/user/user.model';
import {CoreController} from '../core/core.controller';
import {CoreEntity} from '../core/core.entity';
import {CoreService} from '../core/core.service';

@Entity()
export class PostEntity extends CoreEntity {

  @ManyToOne(() => UserEntity)
  public user: UserEntity;

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

@Roles('admin')
@Controller('posts')
@UseGuards(AuthGuard, RoleGuard)
export class PostController extends CoreController<PostEntity> {

  public constructor(service: PostService) {
    super(service);
  }

}

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PostEntity])
  ],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {
}
