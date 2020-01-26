import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { usersProviders } from './user.providers';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  exports: [UserService],
  imports: [forwardRef(() => AuthModule), DatabaseModule],
  providers: [UserService, UserResolver, ...usersProviders],
})
export class UserModule {}
