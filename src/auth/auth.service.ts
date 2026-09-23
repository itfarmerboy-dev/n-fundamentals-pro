import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto.js';
import { UsersService } from '../user/users.service.js';
import bcrypt from 'bcryptjs';
import { User } from '../user/user.entity.js';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

    constructor(private userService : UsersService,
       private jwtService: JwtService
    ){}

    async login(loginDTO: LoginDTO): Promise<{accessToken : string}> {
        const foundedUser :User  = await this.userService.findOne(loginDTO)
        const passwordMatshed = await bcrypt.compare(
            loginDTO.password ,
            foundedUser.password
        );

        if(!passwordMatshed)
            throw new UnauthorizedException('Password Not matshed.')

        const payload = {
            email : foundedUser.email,
            sub : foundedUser.id
        }
        return {
            accessToken : this.jwtService.sign(payload)
        };
         
    }

}
