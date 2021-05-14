import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

export abstract class CoreEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;

}
