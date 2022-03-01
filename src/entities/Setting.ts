import { v4 as uuid } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('settings')
class Setting {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  chat: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export default Setting;
