import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import {AppConfig} from './app/app.model';
import {AppModule} from './app/app.module';

(async () => {
  let app = await NestFactory.create(AppModule);
  let config = app.get<ConfigService<AppConfig>>(ConfigService);
  let prefix = config.get('PREFIX');
  let port = config.get('PORT');
  app.setGlobalPrefix(prefix);
  await app.listen(port);
  let url = await app.getUrl();
  Logger.log(`server started on ${url}`);
})();
