import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Request} from 'express';
import fse from 'fs-extra';
import hasha from 'hasha';
import mime from 'mime';
import path from 'path';
import {DeepPartial} from 'typeorm';
import {PropService} from '../../auth/prop/prop.service';
import {AssetConfig, AssetEntity, AssetLocation} from './asset.model';
import {AssetRepository} from './asset.repository';

@Injectable()
export class AssetService extends PropService<AssetEntity> {

  public constructor(repository: AssetRepository,
                     private config: ConfigService<AssetConfig>) {
    super(repository);
  }

  public async createFile(file: Express.Multer.File, request: Request): Promise<AssetEntity> {
    let partial = await this.store(file);
    return this.createOne(partial, request);
  }

  public async replaceFileById(id: number, file: Express.Multer.File, request: Request): Promise<AssetEntity> {
    let asset = await this.findOneById(id, request);
    let partial = await this.store(file);
    return this.updateOne(asset, partial, request);
  }

  private async store(file: Express.Multer.File): Promise<DeepPartial<AssetEntity>> {
    let storage = this.config.get('ASSET_STORAGE');
    let hash = await hasha.async(file.buffer, {algorithm: 'md5'});
    let ext = mime['getExtension'](file.mimetype);
    let dest = path.resolve(storage, hash);
    await fse.writeFile(dest, file.buffer);
    return {
      location: AssetLocation.INTERNAL,
      name: file.originalname,
      type: file.mimetype,
      hash,
      ext,
      uri: `${hash}`
    };
  }

}
