import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { User } from './user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import *  as bcrypt from 'bcryptjs';
import { LoginDTO } from '../auth/dto/login.dto.js';
import { v4 as uuid4 } from 'uuid';


@Injectable()
export class UsersService {
    
   constructor(
        @InjectRepository(User)
        private userRepo : Repository<User>
   ){}

    async create(userDTO: CreateUserDTO): Promise<User> {

        const user = new User();
        user.firstName = userDTO.firstName;
        user.lastName = userDTO.lastName;
        user.email = userDTO.email;
        user.password = userDTO.password;

        const salt = await bcrypt.genSalt();
        userDTO.password = await bcrypt.hash(userDTO.password,salt);
        const savedUser = await this.userRepo.save(user);
        // delete user.password;
        return savedUser;
    }

    async findOne(loginDTO: LoginDTO):Promise<User> {
        const foundedUser = await this.userRepo.findOneBy(
            {
                email : loginDTO.email
            }
        )
        if(!foundedUser)
            throw new UnauthorizedException('Could not find the User.');
        return foundedUser;
    }


}
