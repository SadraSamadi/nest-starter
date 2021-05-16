import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {Authorization, LoginRequest, RegisterRequest} from './auth.model';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {

  public constructor(private service: AuthService) {
  }

  @Post('register')
  public async register(@Body(ValidationPipe) request: RegisterRequest): Promise<Authorization> {
    return this.service.register(request);
  }

  @Post('login')
  public async login(@Body(ValidationPipe) request: LoginRequest): Promise<Authorization> {
    return this.service.login(request);
  }

}
