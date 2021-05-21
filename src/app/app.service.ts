import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import faker from 'faker';
import {ALL, CREATE, DELETE, READ} from '../auth/auth.constant';
import {RoleService} from '../auth/user/role.service';
import {UserStatus} from '../auth/user/user.entity';
import {UserService} from '../auth/user/user.service';
import {PrefService} from '../pref/pref.service';
import {APP_INITIALIZED} from './app.constant';
import {COMMENTS} from './comment/comment.constant';
import {CommentService} from './comment/comment.service';
import {POSTS} from './post/post.constant';
import {PostService} from './post/post.service';
import {PROFILES} from './profile/profile.constant';
import {ProfileService} from './profile/profile.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {

  public constructor(private prefs: PrefService,
                     private roleService: RoleService,
                     private userService: UserService,
                     private profileService: ProfileService,
                     private postService: PostService,
                     private commentService: CommentService) {
  }

  public async onApplicationBootstrap(): Promise<void> {
    if (await this.prefs.get(APP_INITIALIZED, false))
      return;
    let admin = await this.roleService.createOneByName('admin', [
      {feature: ALL, action: ALL, granted: true, limited: false}
    ]);
    let author = await this.roleService.createOneByName('author', [
      {feature: PROFILES, action: ALL, granted: true, limited: true},
      {feature: POSTS, action: ALL, granted: true, limited: true},
      {feature: COMMENTS, action: CREATE, granted: true, limited: true},
      {feature: COMMENTS, action: READ, granted: true, limited: false},
      {feature: COMMENTS, action: DELETE, granted: true, limited: false}
    ]);
    let user = await this.roleService.createOneByName('user', [
      {feature: PROFILES, action: ALL, granted: true, limited: true},
      {feature: POSTS, action: READ, granted: true, limited: false},
      {feature: COMMENTS, action: CREATE, granted: true, limited: true},
      {feature: COMMENTS, action: READ, granted: true, limited: false}
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
    let users = await this.userService.findAll();
    for (let owner of users)
      await this.profileService.createOne({
        owner,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        birthDate: faker.date.past(50),
        avatar: faker.internet.avatar()
      });
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
    await this.prefs.set(APP_INITIALIZED, true);
  }

}
