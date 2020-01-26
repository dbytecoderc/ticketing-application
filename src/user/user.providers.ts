import { Connection } from 'typeorm';

import {
  DB_CONNECTION_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../common/config/database.tokens.constants';
import { User } from './user.entity';

export const usersProviders = [
  {
    inject: [DB_CONNECTION_TOKEN],
    provide: USER_REPOSITORY_TOKEN,
    useFactory: (connection: Connection): any => connection.getRepository(User),
  },
];
