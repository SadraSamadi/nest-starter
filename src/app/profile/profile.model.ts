import {Column, Entity} from 'typeorm';
import {PropEntity} from '../../auth/prop/prop.model';
import {PROFILES} from './profile.constant';

@Entity(PROFILES)
export class ProfileEntity extends PropEntity {

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public birthDate: Date;

  @Column()
  public avatar: string;

}
