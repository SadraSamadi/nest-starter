import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity('prefs')
export class PrefEntity<T = any> {

  @PrimaryColumn()
  public key: string;

  @Column('simple-json')
  public value: T;

}
