import { JwtModule } from '@nestjs/jwt';
import { Module, forwardRef } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
