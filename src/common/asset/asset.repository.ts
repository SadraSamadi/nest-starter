import {EntityRepository} from 'typeorm';
import {CoreRepository} from '../../core/core.repository';
import {AssetEntity} from './asset.model';

@EntityRepository(AssetEntity)
export class AssetRepository extends CoreRepository<AssetEntity> {

}
