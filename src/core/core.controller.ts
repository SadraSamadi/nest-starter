import {Body, Delete, Get, Param, ParseIntPipe, Patch, Post, Req} from '@nestjs/common';
import {Request} from 'express';
import {CREATE, DELETE, READ, UPDATE} from '../auth/auth.constant';
import {Action} from '../auth/auth.decorator';
import {Pageable} from './core.decorator';
import {CoreEntity, Page, Paging} from './core.model';
import {CoreService} from './core.service';

export interface ICoreController<E extends CoreEntity> {

  createOne(entity: E, request: Request): Promise<E>;

  findOneById(id: number, request: Request): Promise<E>;

  findMany(paging: Paging, request: Request): Promise<Page<E>>;

  findAll(request: Request): Promise<E[]>;

  updateOneById(id: number, entity: E, request: Request): Promise<E>;

  deleteOneById(id: number, request: Request): Promise<E>;

}

export class CoreControllerDelegate<E extends CoreEntity, S extends CoreService<E>>
  implements ICoreController<E> {

  public constructor(private service: S) {
  }

  public async createOne(entity: E, request: Request): Promise<E> {
    return this.service.createOne(entity as object, request);
  }

  public async findOneById(id: number, request: Request): Promise<E> {
    return this.service.findOneById(id, request);
  }

  public async findMany(paging: Paging, request: Request): Promise<Page<E>> {
    return this.service.findMany(paging, request);
  }

  public async findAll(request: Request): Promise<E[]> {
    return this.service.findAll(request);
  }

  public async updateOneById(id: number, entity: E, request: Request): Promise<E> {
    return this.service.updateOneById(id, entity as object, request);
  }

  public async deleteOneById(id: number, request: Request): Promise<E> {
    return this.service.deleteOneById(id, request);
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
                         @Req() request: Request): Promise<E> {
    return this.delegate.createOne(entity, request);
  }

  @Get('one/:id')
  @Action(READ)
  public async findOneById(@Param('id', ParseIntPipe) id: number,
                           @Req() request: Request): Promise<E> {
    return this.delegate.findOneById(id, request);
  }

  @Get('many')
  @Action(READ)
  public async findMany(@Pageable() paging: Paging,
                        @Req() request: Request): Promise<Page<E>> {
    return this.delegate.findMany(paging, request);
  }

  @Get('all')
  @Action(READ)
  public async findAll(@Req() request: Request): Promise<E[]> {
    return this.delegate.findAll(request);
  }

  @Patch('one/:id')
  @Action(UPDATE)
  public async updateOneById(@Param('id', ParseIntPipe) id: number,
                             @Body() entity: E,
                             @Req() request: Request): Promise<E> {
    return this.delegate.updateOneById(id, entity, request);
  }

  @Delete('one/:id')
  @Action(DELETE)
  public async deleteOneById(@Param('id', ParseIntPipe) id: number,
                             @Req() request: Request): Promise<E> {
    return this.delegate.deleteOneById(id, request);
  }

}
