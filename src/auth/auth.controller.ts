import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity.js';
import { Repository } from 'typeorm';
import { UsersService } from '../user/users.service.js';
import { CreateUserDTO } from '../user/dto/create-user.dto.js';
import { LoginDTO } from './dto/login.dto.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
    constructor(
        private usersService :UsersService,
        private authService : AuthService
    ){}

    @Post('signup')
    signup(
        @Body()
        userDTO : CreateUserDTO
    ) : Promise<User>{
        return this.usersService.create(userDTO);
    }

    @Post('login')
    login(
        @Body() 
        loginDTO : LoginDTO
    ){
        return this.authService.login(loginDTO)
    }

    @Get('env')
    getEnvVariables(){
        return this.authService.getEnvVariables();
    }

}
