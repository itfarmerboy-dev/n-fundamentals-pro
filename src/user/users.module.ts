import { Module } from '@nestjs/common';
import { UserService } from './users.service.js';
import { UserController } from './users.controller.js';

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
