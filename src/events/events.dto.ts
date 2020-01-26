import { MessageType } from './../user/user.dto';
import { IsNotEmpty, Length, Matches, IsDecimal, IsInt } from 'class-validator';
import { ObjectType, Field, InputType } from 'type-graphql';
import { Event } from './events.entity';

// export enum Subscription {
//   Free = 'free',
//   Paid = 'paid',
// }

@ObjectType()
export class EventRO {
  @Field(() => MessageType)
  public message: MessageType;
  @Field(() => Event)
  public event?: Promise<Event> | Event;
}

@InputType()
export class EventDTO {
  @Field()
  public event_title: string;

  @IsNotEmpty()
  // @Matches(/^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/, {
  //   message: 'Date must be in MM/DD/YYYY',
  // })
  @Length(1, 255)
  @Field()
  public start_time: string;

  // @Field({ nullable: true })
  // public subscription: Subscription;

  @IsNotEmpty()
  // @Matches(/^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/, {
  //   message: 'Date must be in MM/DD/YYYY',
  // })
  @Length(1, 255)
  @Field()
  public end_time: string;
}

@InputType()
export class UpdateEventDTO {
  @Field()
  public id?: string;

  @Field()
  public event_title: string;

  @IsNotEmpty()
  // @Matches(/^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/, {
  //   message: 'Date must be in MM/DD/YYYY',
  // })
  @Length(1, 255)
  @Field()
  public start_time: string;

  // @Field({ nullable: true })
  // public subscription: Subscription;

  @IsNotEmpty()
  // @Matches(/^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/, {
  //   message: 'Date must be in MM/DD/YYYY',
  // })
  @Length(1, 255)
  @Field()
  public end_time: string;
}
