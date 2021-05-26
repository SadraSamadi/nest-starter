import {Injectable, Logger, OnApplicationBootstrap} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {OnEvent} from '@nestjs/event-emitter';
import {plainToClass} from 'class-transformer';
import faker from 'faker';
import {ALL, CREATE, DELETE, READ} from '../auth/auth.constant';
import {RoleService} from '../auth/user/role.service';
import {UserStatus} from '../auth/user/user.model';
import {UserService} from '../auth/user/user.service';
import {ASSETS} from '../common/asset/asset.constant';
import {AssetLocation} from '../common/asset/asset.model';
import {AssetService} from '../common/asset/asset.service';
import {PrefService} from '../common/pref/pref.service';
import {Event} from '../core/core.model';
import {APP_INITIALIZED} from './app.constant';
import {AppConfig, Externals} from './app.model';
import {COMMENTS} from './comment/comment.constant';
import {CommentService} from './comment/comment.service';
import {POSTS} from './post/post.constant';
import {PostService} from './post/post.service';
import {PROFILES} from './profile/profile.constant';
import {ProfileService} from './profile/profile.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {

  public constructor(private config: ConfigService<AppConfig>,
                     private prefs: PrefService,
                     private roleService: RoleService,
                     private userService: UserService,
                     private assetService: AssetService,
                     private profileService: ProfileService,
                     private postService: PostService,
                     private commentService: CommentService) {
  }

  public async onApplicationBootstrap(): Promise<void> {
    if (await this.prefs.get(APP_INITIALIZED, false))
      return;
    let admin = await this.roleService.createOneByName('admin', [
      {feature: ALL, action: ALL, limited: false, granted: true}
    ]);
    let author = await this.roleService.createOneByName('author', [
      {feature: ASSETS, action: ALL, limited: true, granted: true},
      {feature: PROFILES, action: ALL, limited: true, granted: true},
      {feature: POSTS, action: ALL, limited: true, granted: true},
      {feature: COMMENTS, action: CREATE, limited: true, granted: true},
      {feature: COMMENTS, action: READ, limited: false, granted: true},
      {feature: COMMENTS, action: DELETE, limited: false, granted: true}
    ]);
    let user = await this.roleService.createOneByName('user', [
      {feature: ASSETS, action: ALL, limited: true, granted: true},
      {feature: PROFILES, action: ALL, limited: true, granted: true},
      {feature: POSTS, action: READ, limited: false, granted: true},
      {feature: COMMENTS, action: CREATE, limited: true, granted: true},
      {feature: COMMENTS, action: READ, limited: false, granted: true}
    ]);
    await this.userService.createOne({
      username: 'admin',
      email: 'info@admin.com',
      password: '12345678',
      role: admin,
      status: UserStatus.ACTIVE
    });
    for (let i = 0; i < 2; i++) {
      let owner = await this.userService.createOne({
        username: `author-${i + 1}`,
        email: faker.internet.email(),
        password: '12345678',
        role: author,
        status: UserStatus.ACTIVE
      });
      for (let j = 0; j < 3; j++)
        await this.postService.createOne({
          owner,
          title: faker.name.title(),
          body: faker.lorem.paragraph()
        });
    }
    let posts = await this.postService.findAll();
    for (let i = 0; i < 3; i++) {
      let owner = await this.userService.createOne({
        username: `user-${i + 1}`,
        email: faker.internet.email(),
        password: '12345678',
        role: user,
        status: UserStatus.ACTIVE
      });
      for (let post of posts)
        for (let j = 0; j < 2; j++)
          await this.commentService.createOne({
            owner,
            post,
            body: faker.lorem.sentence()
          });
    }
    let users = await this.userService.findAll();
    for (let owner of users)
      await this.profileService.createOne({
        owner,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        birthDate: faker.date.past(50),
        avatar: await this.assetService.createOne({
          owner,
          location: AssetLocation.EXTERNAL,
          uri: faker.internet.avatar()
        })
      });
    await this.prefs.set(APP_INITIALIZED, true);
  }

  @OnEvent('**')
  public handleEvent(event: Event<any>) {
    Logger.log(`${event.type} - ${event.payload}`);
  }

  public async externals(): Promise<Externals> {
    return plainToClass(Externals, {
      cdn: this.config.get('ASSET_CDN')
    });
  }

}
