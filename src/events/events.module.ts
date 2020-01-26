import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { eventsProviders } from './events.providers';
import { UserResolver } from '../user/user.resolver';
import { UserService } from '../user/user.service';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  exports: [UserService],
  imports: [AuthModule, DatabaseModule],
  providers: [
    EventsService,
    EventsResolver,
    UserService,
    UserResolver,
    ...eventsProviders,
  ],
})
export class EventsModule {}
