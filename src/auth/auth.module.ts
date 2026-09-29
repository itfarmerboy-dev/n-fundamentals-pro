import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../user/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants.js';
import { JWTStrategy } from './jwt-strategy.js';
import { PassportModule } from '@nestjs/passport';
import { ArtistsModule } from '../artists/artists.module.js';
import { ArtistsService } from '../artists/artists.service.js';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    ArtistsModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JWTStrategy
    ],
  exports: [AuthService],
})
export class AuthModule {}
