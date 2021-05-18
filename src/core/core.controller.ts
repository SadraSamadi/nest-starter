import {Body, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {CREATE, DELETE, READ, UPDATE} from '../auth/auth.constant';
import {Action} from '../auth/auth.decorator';
import {Payload} from './core.decorator';
import {CoreEntity, RequestPayload} from './core.model';
import {CoreService} from './core.service';

export abstract class CoreController<E extends CoreEntity, S extends CoreService<E> = CoreService<E>> {

  protected constructor(protected service: S) {
  }

  @Post('one')
  @Action(CREATE)
  public async createOne(@Body() entity: E,
                         @Payload() payload: RequestPayload<E>): Promise<E> {
    return this.service.createOne(entity as object, payload);
  }

  @Get('one/:id')
  @Action(READ)
  public async findOneById(@Param('id', ParseIntPipe) id: number,
                           @Payload() payload: RequestPayload<E>): Promise<E> {
    return this.service.findOneById(id, payload);
  }

  @Get('many')
  @Action(READ)
  public async findMany(@Query('skip', ParseIntPipe) skip: number,
                        @Query('take', ParseIntPipe) take: number,
                        @Payload() payload: RequestPayload<E>): Promise<[E[], number]> {
    return this.service.findMany(skip, take, payload);
  }

  @Get('all')
  @Action(READ)
  public async findAll(@Payload() payload: RequestPayload<E>): Promise<E[]> {
    return this.service.findAll(payload);
  }

  @Patch('one/:id')
  @Action(UPDATE)
  public async updateOneById(@Param('id', ParseIntPipe) id: number,
                             @Body() entity: E,
                             @Payload() payload: RequestPayload<E>): Promise<E> {
    return this.service.updateOneById(id, entity as object, payload);
  }

  @Delete('one/:id')
  @Action(DELETE)
  public async deleteOneById(@Param('id', ParseIntPipe) id: number,
                             @Payload() payload: RequestPayload<E>): Promise<E> {
    return this.service.deleteOneById(id, payload);
  }

}
