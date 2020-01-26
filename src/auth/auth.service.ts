import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  GenerateToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  ValidateToken(token: string) {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return error.name;
    }
  }

  decodeToken(token: string): any {
    try {
      return this.jwtService.decode(token);
    } catch (error) {
      return error.name;
    }
  }
}
