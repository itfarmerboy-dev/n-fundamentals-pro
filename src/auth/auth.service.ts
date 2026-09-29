import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto.js';
import { UsersService } from '../user/users.service.js';
import bcrypt from 'bcryptjs';
import { User } from '../user/user.entity.js';
import { JwtService } from '@nestjs/jwt'
import { ArtistsService } from '../artists/artists.service.js';
import { PayloadType } from './dto/types.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(private userService : UsersService,
       private jwtService: JwtService,
       private artistService :ArtistsService,
       private configService : ConfigService
    ){}

    async login(loginDTO: LoginDTO): Promise<{accessToken : string}> {
        const foundedUser :User  = await this.userService.findOne(loginDTO)
        const passwordMatshed = await bcrypt.compare(
            loginDTO.password ,
            foundedUser.password
        );

        if(!passwordMatshed)
            throw new UnauthorizedException('Password Not matshed.')

        const payload : PayloadType = {  
            email : foundedUser.email,
            userId : foundedUser.id
        }

        const artist = await this.artistService.findArtist(foundedUser.id);
        
        if(artist)
            payload.artistId =  artist.id;

        return {
            accessToken : this.jwtService.sign(payload)
        };
         
    }


    getEnvVariables(){
        return {
            port : this.configService.get<number>('port'),
            secret : this.configService.get<string>('secret')
        }
    }

}
