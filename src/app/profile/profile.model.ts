import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';
import {PropEntity} from '../../auth/prop/prop.model';
import {AssetEntity} from '../../common/asset/asset.model';
import {PROFILES} from './profile.constant';

@Entity(PROFILES)
export class ProfileEntity extends PropEntity {

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public birthDate: Date;

  @JoinColumn()
  @OneToOne(() => AssetEntity, {eager: true})
  public avatar: AssetEntity;

}
