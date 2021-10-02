import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

export interface JWTPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.getUserByEmail(email);
    if (user) return await user.validatePassword(password);
    return null;
  }

  async generateAccessToken(email: string) {
    const user = await this.usersService.getUserByEmail(email);
    const payload: JWTPayload = { userId: user.userId };
    return {
      user_id: user.userId,
      access_token: this.jwtService.sign(payload),
    };
  }
}
