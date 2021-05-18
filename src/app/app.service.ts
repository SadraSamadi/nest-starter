import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import faker from 'faker';
import {ALL, READ} from '../auth/auth.constant';
import {RoleService} from '../auth/user/role.service';
import {UserService} from '../auth/user/user.service';
import {UserStatus} from '../auth/user/user.entity';
import {PostService} from './post.feature';

@Injectable()
export class AppService implements OnApplicationBootstrap {

  public constructor(private roleService: RoleService,
                     private userService: UserService,
                     private postService: PostService) {
  }

  public async onApplicationBootstrap(): Promise<void> {
    let admin = await this.roleService.createOneByName('admin', [
      {feature: ALL, action: ALL, limited: false}
    ]);
    let author = await this.roleService.createOneByName('author', [
      {feature: 'posts', action: ALL, limited: true}
    ]);
    let user = await this.roleService.createOneByName('user', [
      {feature: 'posts', action: READ, limited: false}
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
  }

}
