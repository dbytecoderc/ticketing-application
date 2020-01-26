import {
  Injectable,
  Inject,
  ConflictException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { USER_REPOSITORY_TOKEN } from '../common/config/database.tokens.constants';
import { User } from './user.entity';
import { CreateUserDTO, LoginUserDTO } from './user.dto';

@Injectable()
export class UserService {
  public constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      const messages = {
        message: 'User does not exist',
      };
      throw new ConflictException({
        messages,
        status: HttpStatus.NOT_FOUND,
      });
    }

    return user;
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    return user as any;
  }

  public async register(userDTO: CreateUserDTO): Promise<User> {
    const { email, password, name }: CreateUserDTO = userDTO;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', {
        email,
      })
      .getOne();

    if (user && user.email === email) {
      throw new ConflictException({
        message: 'Email already exist',
        status: HttpStatus.CONFLICT,
      });
    }
    const nodeEnv: string = process.env.SALT as string;
    const hashedPassword = await bcrypt.hash(password, parseInt(nodeEnv, 10));

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();

    return newUser;
  }

  public async login(userDTO: LoginUserDTO): Promise<User> {
    const { email, password }: LoginUserDTO = userDTO;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (!user || !user.isActive) {
      throw new BadRequestException({
        messages: {
          email: 'Invalid crendetials',
        },
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException({
        messages: {
          password: 'Invalid crendetials',
        },
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return user;
  }
}
