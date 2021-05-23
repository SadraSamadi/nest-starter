import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe
} from '@nestjs/common';
import {User} from './auth.decorator';
import {AuthGuard} from './auth.guard';
import {Authorization, LoginRequest, RegisterRequest, UpdateRequest} from './auth.model';
import {AuthService} from './auth.service';
import {UserEntity} from './user/user.model';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

  public constructor(private service: AuthService) {
  }

  @Post('register')
  public async register(@Body(ValidationPipe) request: RegisterRequest): Promise<Authorization> {
    return this.service.register(request as any);
  }

  @Post('login')
  public async login(@Body(ValidationPipe) request: LoginRequest): Promise<Authorization> {
    return this.service.login(request);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  public async findUser(@User() user: UserEntity): Promise<UserEntity> {
    return this.service.findUser(user);
  }

  @Patch('user')
  @UseGuards(AuthGuard)
  public async updateUser(@User() user: UserEntity,
                          @Body() request: UpdateRequest): Promise<UserEntity> {
    return this.service.updateUser(user, request);
  }

}
