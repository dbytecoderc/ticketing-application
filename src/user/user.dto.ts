import { HttpStatus } from '@nestjs/common';
import { IsAlpha, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Field, InputType, Int, ObjectType } from 'type-graphql';

import { User } from './user.entity';

@InputType()
export class CreateUserDTO {
  @IsNotEmpty()
  @Length(1, 255)
  @IsEmail()
  @Field()
  public email: string;

  @IsNotEmpty()
  @Length(6, 255)
  @Field()
  public password: string;

  @IsAlpha()
  @Length(1, 255)
  @Field()
  public name: string;
}

@ObjectType()
export class MessageType {
  @Field()
  public message: string;
  @Field(() => Int)
  public status: HttpStatus;
}

@ObjectType()
export class UserRO {
  @Field(() => MessageType)
  public message: MessageType;
  @Field({ nullable: true })
  public token?: string;
  @Field(() => User)
  public user: Promise<User> | User;
}

@InputType()
export class LoginUserDTO {
  @IsNotEmpty()
  @Length(1, 255)
  @Field()
  public password: string;

  @IsNotEmpty()
  @Length(1, 255)
  @IsEmail()
  @Field()
  public email: string;
}
