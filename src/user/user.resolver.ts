import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HttpStatus, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDTO, UserRO, LoginUserDTO } from './user.dto';
import { CurrentUser } from '../utils/createParamDecorators';
import { GqlAuthGuard } from '../auth/auth.guard';
import { User } from './user.entity';

@Resolver('User')
export class UserResolver {
  public constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Query(() => String)
  @UseGuards(GqlAuthGuard)
  public getUser(@CurrentUser() user: User) {
    console.log(user);
    return 'logged user?';
  }

  @Mutation(() => UserRO)
  public async register(
    @Args('data')
    { email, password, name }: CreateUserDTO,
  ): Promise<UserRO> {
    const user = await this.userService.register({
      email,
      password,
      name,
    });

    const token = this.authService.GenerateToken({
      sub: user.id,
    });

    return {
      token,
      user,
      message: {
        message: 'Account created successfully',
        status: HttpStatus.CREATED,
      },
    };
  }

  @Mutation(() => UserRO)
  public async login(
    @Args('data')
    { password, email }: LoginUserDTO,
  ): Promise<UserRO> {
    const user = await this.userService.login({
      password,
      email,
    });

    const token = this.authService.GenerateToken({
      sub: user.id,
    });

    return {
      token,
      user,
      message: {
        message: 'Login Successful',
        status: HttpStatus.OK,
      },
    };
  }
}
