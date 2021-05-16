import {Body, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {DeepPartial} from 'typeorm';
import {CoreEntity} from './core.entity';
import {CoreService} from './core.service';

export abstract class CoreController<E extends CoreEntity, S extends CoreService<E> = CoreService<E>> {

  protected constructor(protected service: S) {
  }

  @Post('one')
  public async createOne(@Body() partial: DeepPartial<E>): Promise<E> {
    return this.service.createOne(partial);
  }

  @Post('many')
  public async createMany(@Body() partials: DeepPartial<E>[]): Promise<E[]> {
    return this.service.createMany(partials);
  }

  @Get('one/:id')
  public async findOneById(@Param('id', ParseIntPipe) id: number): Promise<E> {
    return this.service.findOneById(id);
  }

  @Get('many')
  public async findMany(@Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
                        @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number): Promise<[E[], number]> {
    return this.service.findMany(skip, take);
  }

  @Get('all')
  public async findAll(): Promise<E[]> {
    return this.service.findAll();
  }

  @Patch('one/:id')
  public async updateOneById(@Param('id', ParseIntPipe) id: number,
                             @Body() partial: DeepPartial<E>): Promise<E> {
    return this.service.updateOneById(id, partial);
  }

  @Delete('one/:id')
  public async deleteOneById(@Param('id', ParseIntPipe) id: number): Promise<E> {
    return this.service.deleteOneById(id);
  }

}
