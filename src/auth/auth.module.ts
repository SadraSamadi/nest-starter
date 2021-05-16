import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthController} from './auth.controller';
import {AuthGuard, RoleGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {RoleController, UserController} from './user/user.controller';
import {RoleEntity, UserEntity} from './user/user.model';
import {RoleService, UserService} from './user/user.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      RoleEntity,
      UserEntity
    ])
  ],
  providers: [
    RoleService,
    UserService,
    AuthService,
    AuthGuard,
    RoleGuard
  ],
  controllers: [
    RoleController,
    UserController,
    AuthController
  ],
  exports: [
    RoleService,
    UserService,
    AuthService,
    AuthGuard,
    RoleGuard
  ]
})
export class AuthModule {
}
