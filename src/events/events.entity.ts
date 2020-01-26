import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
// import { Subscription } from './events.dto';

@ObjectType()
@Entity()
export class Event extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column()
  public event_title: string;

  @Field()
  @Column()
  public start_time: string;

  @Field()
  @Column({ nullable: true })
  public end_time: string;

  @Field()
  @Column({ default: true })
  public isActive: boolean;

  @Field()
  @Column({ default: false })
  public isDeleted: boolean;

  // @Field()
  // @Column('enum', { enum: Subscription, default: Subscription.Free })
  // public subscription: Subscription;

  @Field(() => User)
  @OneToOne(
    () => User,
    (user: User) => user,
  )
  @JoinColumn()
  public deletedBy: User;

  @Field(() => User)
  @ManyToOne(
    () => User,
    (user: User) => user.id,
  )
  public createdBy: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  public updated_at: Date;
}
