import {DynamicModule, Module, Type} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {TypeOrmModule} from '@nestjs/typeorm';
import {plainToClass} from 'class-transformer';
import {validateSync} from 'class-validator';
import {CoreConfig} from './core.model';

@Module({
  imports: [
    EventEmitterModule.forRoot({wildcard: true})
  ]
})
export class CoreModule {

  public static forRoot(type: Type): DynamicModule {
    return {
      module: CoreModule,
      imports: [
        ConfigModule.forRoot({
          expandVariables: true,
          envFilePath: [
            'res/.env',
            `res/${process.env.NODE_ENV}.env`
          ],
          validate: config => {
            let cfg = plainToClass(type, config, {enableImplicitConversion: true});
            let errors = validateSync(cfg);
            if (errors.length) {
              let msg = errors.toString();
              throw new Error(msg);
            }
            return cfg;
          }
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService<CoreConfig>) => ({
            type: config.get<any>('DB_TYPE'),
            host: config.get('DB_HOST'),
            port: config.get('DB_PORT'),
            database: config.get<string>('DB_NAME'),
            username: config.get('DB_USER'),
            password: config.get('DB_PASS'),
            synchronize: config.get('DEBUG'),
            dropSchema: config.get('DEBUG'),
            logging: config.get('DB_LOGG'),
            autoLoadEntities: true
          })
        })
      ]
    };
  }

}
