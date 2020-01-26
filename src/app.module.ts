import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import 'dotenv/config';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
      introspection: true,
      playground: true,
    }),
    AuthModule,
    DatabaseModule,
    UserModule,
    EventsModule,
  ],
  providers: [],
})
export class AppModule {}
