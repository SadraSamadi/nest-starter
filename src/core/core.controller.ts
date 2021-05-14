import {CoreEntity} from './core.entity';
import {CoreService} from './core.service';

export abstract class CoreController<E extends CoreEntity, S extends CoreService<E, any>> {

  protected constructor(protected service: S) {
  }

}
