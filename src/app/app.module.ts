import {Module} from '@nestjs/common';
import {AuthModule} from '../auth/auth.module';
import {CoreModule} from '../core/core.module';
import {PrefModule} from '../pref/pref.module';
import {AppController} from './app.controller';
import {AppConfig} from './app.model';
import {AppService} from './app.service';
import {CommentModule} from './comment/comment.module';
import {PostModule} from './post/post.module';
import {ProfileModule} from './profile/profile.module';
import {RoleController} from './user/role.controller';
import {UserController} from './user/user.controller';

@Module({
  imports: [
    CoreModule.forRoot(AppConfig),
    AuthModule,
    PrefModule,
    ProfileModule,
    PostModule,
    CommentModule
  ],
  providers: [AppService],
  controllers: [
    RoleController,
    UserController,
    AppController
  ]
})
export class AppModule {
}
