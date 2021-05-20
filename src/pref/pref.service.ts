import {Injectable} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {PrefEntity} from './pref.model';
import {PrefRepository} from './pref.repository';

@Injectable()
export class PrefService {

  public constructor(private repository: PrefRepository) {
  }

  public async set<T>(key: string, value: T): Promise<T> {
    let pref = plainToClass(PrefEntity, {key, value});
    await this.repository.save(pref);
    return value;
  }

  public async get<T>(key: string, def?: T): Promise<T> {
    try {
      let pref = await this.repository.findOneOrFail(key);
      return pref.value;
    } catch (err) {
      return def;
    }
  }

  public async delete<T>(key: string): Promise<T> {
    try {
      let pref = await this.repository.findOneOrFail(key);
      await this.repository.remove(pref);
      return pref.value;
    } catch (err) {
      return null;
    }
  }

}
