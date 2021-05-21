import {Get, Req} from '@nestjs/common';
import {Request} from 'express';
import {CoreController, CoreControllerDelegate, ICoreController} from '../../core/core.controller';
import {READ} from '../auth.constant';
import {Action} from '../auth.decorator';
import {PropEntity} from './prop.model';
import {PropService} from './prop.service';

export interface IPropController<P extends PropEntity>
  extends ICoreController<P> {

  findOne(request: Request): Promise<P>;

}

export class PropControllerDelegate<P extends PropEntity, S extends PropService<P>>
  extends CoreControllerDelegate<P, S> implements IPropController<P> {

  public async findOne(request: Request): Promise<P> {
    return this.service.findOne(request);
  }

}

export abstract class PropController<P extends PropEntity, S extends PropService<P> = PropService<P>, D extends PropControllerDelegate<P, S> = PropControllerDelegate<P, S>>
  extends CoreController<P, S, D> implements IPropController<P> {

  protected constructor(service: S,
                        delegate = new PropControllerDelegate<P, S>(service) as D) {
    super(service, delegate);
  }

  @Get('one')
  @Action(READ)
  public async findOne(@Req() request: Request): Promise<P> {
    return this.delegate.findOne(request);
  }

}
