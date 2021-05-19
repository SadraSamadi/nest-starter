import {Body, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {CREATE, DELETE, READ, UPDATE} from '../auth/auth.constant';
import {Action} from '../auth/auth.decorator';
import {PageableDefault, Payload} from './core.decorator';
import {CoreEntity, Page, Pageable, RequestPayload} from './core.model';
import {CoreService} from './core.service';

export interface ICoreController<E extends CoreEntity> {

  createOne(entity: E, payload: RequestPayload<E>): Promise<E>;

  findOneById(id: number, payload: RequestPayload<E>): Promise<E>;

  findMany(pageable: Pageable, payload: RequestPayload<E>): Promise<Page<E>>;

  findAll(payload: RequestPayload<E>): Promise<E[]>;

  updateOneById(id: number, entity: E, payload: RequestPayload<E>): Promise<E>;

  deleteOneById(id: number, payload: RequestPayload<E>): Promise<E>;

}

export class CoreControllerDelegate<E extends CoreEntity, S extends CoreService<E>>
  implements ICoreController<E> {

  public constructor(private service: S) {
  }

  public async createOne(entity: E, payload: RequestPayload<E>): Promise<E> {
    return this.service.createOne(entity as object, payload);
  }

  public async findOneById(id: number, payload: RequestPayload<E>): Promise<E> {
    return this.service.findOneById(id, payload);
  }

  public async findMany(pageable: Pageable, payload: RequestPayload<E>): Promise<Page<E>> {
    return this.service.findMany(pageable, payload);
  }

  public async findAll(payload: RequestPayload<E>): Promise<E[]> {
    return this.service.findAll(payload);
  }

  public async updateOneById(id: number, entity: E, payload: RequestPayload<E>): Promise<E> {
    return this.service.updateOneById(id, entity as object, payload);
  }

  public async deleteOneById(id: number, payload: RequestPayload<E>): Promise<E> {
    return this.service.deleteOneById(id, payload);
  }

}

export abstract class CoreController<E extends CoreEntity, S extends CoreService<E> = CoreService<E>>
  implements ICoreController<E> {

  protected delegate: CoreControllerDelegate<E, S>;

  protected constructor(protected service: S) {
    this.delegate = new CoreControllerDelegate<E, S>(service);
  }

  @Post('one')
  @Action(CREATE)
  public async createOne(@Body() entity: E,
                         @Payload() payload: RequestPayload<E>): Promise<E> {
    return this.delegate.createOne(entity, payload);
  }

  @Get('one/:id')
  @Action(READ)
  public async findOneById(@Param('id', ParseIntPipe) id: number,
                           @Payload() payload: RequestPayload<E>): Promise<E> {
    return this.delegate.findOneById(id, payload);
  }

  @Get('many')
  @Action(READ)
  public async findMany(@PageableDefault() pageable: Pageable,
                        @Payload() payload: RequestPayload<E>): Promise<Page<E>> {
    return this.delegate.findMany(pageable, payload);
  }

  @Get('all')
  @Action(READ)
  public async findAll(@Payload() payload: RequestPayload<E>): Promise<E[]> {
    return this.delegate.findAll(payload);
  }

  @Patch('one/:id')
  @Action(UPDATE)
  public async updateOneById(@Param('id', ParseIntPipe) id: number,
                             @Body() entity: E,
                             @Payload() payload: RequestPayload<E>): Promise<E> {
    return this.delegate.updateOneById(id, entity, payload);
  }

  @Delete('one/:id')
  @Action(DELETE)
  public async deleteOneById(@Param('id', ParseIntPipe) id: number,
                             @Payload() payload: RequestPayload<E>): Promise<E> {
    return this.delegate.deleteOneById(id, payload);
  }

}
