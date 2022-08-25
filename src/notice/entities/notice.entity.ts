import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('notice')
export class Notice {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'title',
    comment: '消息标题',
  })
  title: string;

  @Column({
    nullable: false,
    name: 'author',
    comment: '消息作者',
  })
  author: string;

  @Column({
    nullable: false,
    name: 'content',
    comment: '消息内容',
  })
  content: string;

  @Column({
    name: 'target_url',
    comment: '跳转地址',
  })
  target_url: string;

  @Column({
    type: 'enum',
    enum: [0, 1, 2],
    nullable: false,
    name: 'type',
    comment: '类型,0: 消息,1: 通知,2: 警告',
  })
  type: number;

  // 创建时间
  @CreateDateColumn({ name: 'create_time' })
  create_time: Date;

  // 创建时间
  @UpdateDateColumn({ name: 'update_time' })
  update_time: Date;
}
