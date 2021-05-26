import {ClassSerializerInterceptor, Controller, Get, UseInterceptors} from '@nestjs/common';
import {Externals} from './app.model';
import {AppService} from './app.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {

  public constructor(private service: AppService) {
  }

  @Get('externals')
  public async externals(): Promise<Externals> {
    return this.service.externals();
  }

}
