import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() loginDTO: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDTO;
    const valid = await this.authService.validateUser(email, password);
    console.log(
      `DATA ---> Email: ${email}, Password: ${password}, Valid: ${valid}`,
    );
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.authService.generateAccessToken(email);
  }
}
