import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthController} from './auth.controller';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {PermissionGuard} from './user/permission.guard';
import {PermissionRepository} from './user/permission.repository';
import {RoleGuard} from './user/role.guard';
import {RoleRepository} from './user/role.repository';
import {RoleService} from './user/role.service';
import {UserRepository} from './user/user.repository';
import {UserService} from './user/user.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      PermissionRepository,
      RoleRepository,
      UserRepository
    ])
  ],
  providers: [
    RoleService,
    UserService,
    AuthService,
    AuthGuard,
    RoleGuard,
    PermissionGuard
  ],
  controllers: [AuthController],
  exports: [
    RoleService,
    UserService,
    AuthService,
    AuthGuard,
    RoleGuard,
    PermissionGuard
  ]
})
export class AuthModule {
}
