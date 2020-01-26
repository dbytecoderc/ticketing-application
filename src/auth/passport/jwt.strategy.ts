import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';

import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.PRIVATE_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.getUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException({
        message: 'You are not authorized to make this action',
        status: HttpStatus.UNAUTHORIZED,
      });
    }
    return { id: payload.sub, role: payload.role };
  }
}
