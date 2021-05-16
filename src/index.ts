import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppConfig} from './app/app.model';
import {AppModule} from './app/app.module';

(async () => {
  let app = await NestFactory.create(AppModule);
  let config = app.get<ConfigService<AppConfig>>(ConfigService);
  let prefix = config.get('PREFIX');
  app.setGlobalPrefix(prefix);

  const cfg = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('docs', app, document);

  let port = config.get('PORT');
  await app.listen(port);
  let url = await app.getUrl();
  Logger.log(`server started on ${url}`);
})();
