import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthController} from './auth.controller';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {PermissionGuard} from './user/permission.guard';
import {PermissionEntity} from './user/permission.model';
import {RoleGuard} from './user/role.guard';
import {RoleEntity} from './user/role.model';
import {RoleService} from './user/role.service';
import {UserEntity} from './user/user.entity';
import {UserService} from './user/user.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      PermissionEntity,
      RoleEntity,
      UserEntity
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
