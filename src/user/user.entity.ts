import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @Column()
  public email: string;

  @Field()
  @Column()
  @Column({ nullable: true })
  public name: string;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column({ default: true })
  public isActive: boolean;

  @Column()
  @Column({ nullable: true })
  public password: string;
}
