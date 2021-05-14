import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {

  public async greet(name = 'World'): Promise<string> {
    return `Hello, ${name}`;
  }

}
