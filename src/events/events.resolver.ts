import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CurrentUser } from './../utils/createParamDecorators';
import { User } from './../user/user.entity';
import { GqlAuthGuard } from './../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventRO, EventDTO, UpdateEventDTO } from './events.dto';
import { MessageType } from '../user/user.dto';
import { Event } from './events.entity';

@Resolver('Events')
export class EventsResolver {
  public constructor(private eventsService: EventsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => EventRO)
  public async createEvent(
    @CurrentUser() user: User,
    @Args('data')
    event: EventDTO,
  ): Promise<any> {
    return await this.eventsService.createEvent(event, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Event])
  public async allEvents() {
    return await this.eventsService.getEvents();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Event)
  public async event(@Args('id') id: string) {
    return await this.eventsService.getEvent(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Event)
  public async updateEvent(@Args('data') eventData: UpdateEventDTO) {
    return await this.eventsService.updateEvent(eventData.id as any, eventData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MessageType)
  public async deleteEvent(@CurrentUser() user: User, @Args('id') id: string) {
    return await this.eventsService.deleteEvent(id, user);
  }
}
