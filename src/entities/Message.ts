import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from './User';

@Entity('messages')
class Message {
  @PrimaryColumn()
  id: string;

  @Column()
  adminId: string;

  @Column()
  userId: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User)
  user: User;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export default Message;
