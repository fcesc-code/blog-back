import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import SECRET_KEY from './SECRET_KEY';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: SECRET_KEY,
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],

  exports: [AuthService],
})
export class AuthModule {}
