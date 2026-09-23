import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../user/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants.js';
import { JWTStrategy } from './jwt-strategy.js';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JWTStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
