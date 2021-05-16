import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {DeepPartial} from 'typeorm';
import {UserEntity, UserStatus} from '../auth/user/user.model';
import {RoleService, UserService} from '../auth/user/user.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {

  public constructor(private roleService: RoleService,
                     private userService: UserService) {
  }

  public async onApplicationBootstrap(): Promise<void> {
    let roles = await this.roleService.createManyByNames('admin', 'user');
    let users = roles.map<DeepPartial<UserEntity>>(role => ({
      role,
      username: role.name,
      email: `${role.name}@email.com`,
      password: '12345678',
      status: UserStatus.ACTIVE
    }));
    await this.userService.createMany(users);
  }

}
