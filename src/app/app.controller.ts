import {Controller, Get, Query} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {

  public constructor(private service: AppService) {
  }

  @Get()
  public async greet(@Query('name') name: string): Promise<string> {
    return this.service.greet(name);
  }

}
