import {plainToClass, Transform} from 'class-transformer';
import {IsBoolean, IsNumber, IsObject, IsString} from 'class-validator';
import {ParsedQs} from 'qs';
import {CreateDateColumn, DatabaseType, FindManyOptions, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {parseBoolean} from './core.util';

export class CoreConfig {

  @IsBoolean()
  @Transform(parseBoolean)
  public DEBUG: boolean;

  @IsString()
  public PREFIX: string;

  @IsNumber()
  public PORT: number;

  @IsString()
  public DB_TYPE: DatabaseType;

  @IsString()
  public DB_HOST: string;

  @IsNumber()
  public DB_PORT: number;

  @IsString()
  public DB_NAME: string;

  @IsString()
  public DB_USER: string;

  @IsString()
  public DB_PASS: string;

  @IsBoolean()
  @Transform(parseBoolean)
  public DB_LOGG: boolean;

}

export class Paging {

  @IsNumber()
  public page: number;

  @IsNumber()
  public size: number;

  @IsString({each: true})
  public sort: string[];

  public static from(query: ParsedQs, def?: Partial<Paging>): Paging {
    return plainToClass(Paging, {
      page: parseInt(query.page as string) || def?.page,
      size: parseInt(query.size as string) || def?.size,
      sort: query.sort ? Array.isArray(query.sort) ? query.sort : [query.sort] : def?.sort
    });
  }

  public convert<T>(): FindManyOptions<T> {
    return {
      skip: this.page * this.size,
      take: this.size,
      order: this.sort.reduce((prev, curr) => {
        let [field, dir] = curr.split(',');
        return {
          ...prev,
          [field]: dir.toUpperCase()
        };
      }, {})
    };
  }

}

export class Page<E> {

  @IsObject({each: true})
  public items: E[];

  @IsNumber()
  public total: number;

  @IsObject()
  public paging: Paging;

  public static from<S>([items, total]: [S[], number], paging: Paging): Page<S> {
    return plainToClass(Page, {items, total, paging});
  }

  public async map<S>(mapper: (item: E, index: number, items: E[]) => S | Promise<S>): Promise<Page<S>> {
    let items: S[] = [];
    for (let i = 0; i < this.items.length; i++) {
      let prev = this.items[i];
      let curr = await mapper(prev, i, this.items);
      items.push(curr);
    }
    return Page.from([items, this.total], this.paging);
  }

}

export class Event<P> {

  public constructor(public type: string,
                     public payload: P) {
  }

}

export abstract class CoreEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;

}
