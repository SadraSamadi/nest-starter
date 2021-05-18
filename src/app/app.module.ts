import {Module} from '@nestjs/common';
import {AuthModule} from '../auth/auth.module';
import {CoreModule} from '../core/core.module';
import {AppController, RoleController, UserController} from './app.controller';
import {AppConfig} from './app.model';
import {AppService} from './app.service';
import {PostModule} from './post.feature';

@Module({
  imports: [
    CoreModule.forRoot(AppConfig),
    AuthModule,
    PostModule
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
