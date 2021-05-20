import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import faker from 'faker';
import {ALL, CREATE, DELETE, READ} from '../auth/auth.constant';
import {RoleService} from '../auth/user/role.service';
import {UserStatus} from '../auth/user/user.entity';
import {UserService} from '../auth/user/user.service';
import {PrefService} from '../pref/pref.service';
import {APP_INITIALIZED} from './app.constant';
import {PostService} from './post/post.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {

  public constructor(private prefs: PrefService,
                     private roleService: RoleService,
                     private userService: UserService,
                     private postService: PostService) {
  }

  public async onApplicationBootstrap(): Promise<void> {
    if (await this.prefs.get(APP_INITIALIZED, false))
      return;
    let admin = await this.roleService.createOneByName('admin', [
      {feature: ALL, action: ALL, granted: true, limited: false}
    ]);
    let author = await this.roleService.createOneByName('author', [
      {feature: 'posts', action: ALL, granted: true, limited: true},
      {feature: 'comments', action: CREATE, granted: true, limited: true},
      {feature: 'comments', action: READ, granted: true, limited: true},
      {feature: 'comments', action: DELETE, granted: true, limited: true}
    ]);
    let user = await this.roleService.createOneByName('user', [
      {feature: 'posts', action: READ, granted: true, limited: false},
      {feature: 'comments', action: CREATE, granted: true, limited: true},
      {feature: 'comments', action: READ, granted: true, limited: false}
    ]);
    await this.userService.createOne({
      username: 'admin',
      email: 'admin@email.com',
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
    for (let i = 0; i < 3; i++)
      await this.userService.createOne({
        username: `user-${i + 1}`,
        email: faker.internet.email(),
        password: '12345678',
        role: user,
        status: UserStatus.ACTIVE
      });
    await this.prefs.set(APP_INITIALIZED, true);
  }

}
