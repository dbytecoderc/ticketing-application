import { Connection } from 'typeorm';

import {
  DB_CONNECTION_TOKEN,
  USER_REPOSITORY_TOKEN,
  EVENT_REPOSITORY_TOKEN,
} from '../common/config/database.tokens.constants';
import { User } from '../user/user.entity';
import { Event } from './events.entity';

export const eventsProviders = [
  {
    inject: [DB_CONNECTION_TOKEN],
    provide: USER_REPOSITORY_TOKEN,
    useFactory: (connection: Connection): any => connection.getRepository(User),
  },
  {
    inject: [DB_CONNECTION_TOKEN],
    provide: EVENT_REPOSITORY_TOKEN,
    useFactory: (connection: Connection): any =>
      connection.getRepository(Event),
  },
];
