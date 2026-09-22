import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity.js';
import { Repository } from 'typeorm';
import { UsersService } from '../user/users.service.js';
import { CreateUserDTO } from '../user/dto/crate-user.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService :UsersService){}

    @Post('signup')
    signup(
        @Body()
        userDTO : CreateUserDTO
    ) : Promise<User>{
        return this.usersService.create(userDTO);
    }

}
