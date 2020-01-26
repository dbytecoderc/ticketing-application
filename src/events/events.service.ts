import {
  Injectable,
  Inject,
  ConflictException,
  HttpStatus,
  //   BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  //   USER_REPOSITORY_TOKEN,
  EVENT_REPOSITORY_TOKEN,
} from '../common/config/database.tokens.constants';
import { User } from '../user/user.entity';
import { Event } from './events.entity';
import { EventDTO, EventRO } from './events.dto';

@Injectable()
export class EventsService {
  public constructor(
    @Inject(EVENT_REPOSITORY_TOKEN)
    private readonly eventRepositoryToken: Repository<Event>,
  ) {}

  public async createEvent(data: EventDTO, user: User): Promise<EventRO> {
    const event = this.eventRepositoryToken.create({
      event_title: data.event_title,
      start_time: data.start_time,
      end_time: data.end_time,
      createdBy: user,
    });

    const message = {
      message: 'Event created succesfully',
      status: HttpStatus.CREATED,
    };

    await event.save();

    return {
      message,
      event,
    };
  }

  public async getEvents(): Promise<Event[]> {
    const events = await this.eventRepositoryToken
      .createQueryBuilder('event')
      .where({ isDeleted: false })
      .getMany();

    return events;
  }

  public async getEvent(id: string): Promise<any> {
    const event = await this.eventRepositoryToken.findOne({
      where: { id, isDeleted: false },
    });

    return event;
  }

  public async updateEvent(id: string, eventData: EventDTO): Promise<any> {
    const event = await this.eventRepositoryToken.findOne({
      where: { id, isDeleted: false },
    });

    if (!event) {
      const messages = {
        message: 'event does not exist',
      };
      throw new ConflictException({
        messages,
        status: HttpStatus.NOT_FOUND,
      });
    }

    await this.eventRepositoryToken.update(event.id, {
      event_title: eventData.event_title,
      start_time: eventData.start_time,
      end_time: eventData.end_time,
    });

    return await this.eventRepositoryToken.findOne(id);
  }

  public async deleteEvent(id: string, user: User): Promise<any> {
    const event = await this.eventRepositoryToken.findOne({
      where: { id, isDeleted: false },
    });

    if (!event) {
      const messages = {
        message: 'event does not exist',
      };
      throw new ConflictException({
        messages,
        status: HttpStatus.NOT_FOUND,
      });
    }

    await this.eventRepositoryToken.update(event.id, {
      isDeleted: true,
      deletedBy: user,
    });

    const message = {
      message: 'Event deleted succesfully',
      status: HttpStatus.CREATED,
    };

    return message;
  }
}
