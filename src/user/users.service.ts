import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/crate-user.dto.js';
import { User } from './user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import *  as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

   constructor(
        @InjectRepository(User)
        private userRepo : Repository<User>
   ){}

    async create(userDTO: CreateUserDTO): Promise<User> {
        const salt = await bcrypt.genSalt();
        userDTO.password = await bcrypt.hash(userDTO.password,salt);
        const user = await this.userRepo.save(userDTO);
        // delete user.password;
        return user;
    }
}
