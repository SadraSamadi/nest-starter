import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {plainToClass} from 'class-transformer';
import {validateSync} from 'class-validator';
import {PostModule} from '../post/post.module';
import {AppController} from './app.controller';
import {AppConfig} from './app.model';
import {AppService} from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      envFilePath: [
        'config/.env',
        `config/${process.env.NODE_ENV}.env`
      ],
      validate: config => {
        let cfg = plainToClass(AppConfig, config, {enableImplicitConversion: true});
        let errors = validateSync(cfg);
        if (errors.length)
          throw new Error(`${errors}`);
        return cfg;
      }
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig>) => ({
        type: config.get('DB_TYPE') as any,
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        database: config.get('DB_NAME') as string,
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        synchronize: config.get('DEBUG'),
        dropSchema: config.get('DEBUG'),
        logging: config.get('DEBUG'),
        autoLoadEntities: true
      })
    }),
    PostModule
  ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {
}
