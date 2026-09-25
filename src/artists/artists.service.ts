import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(Artist)
        private artistRepo : Repository<Artist>
    ){}

    findArtist(
        userId : number
    ):Promise<Artist | null>{
        return this.artistRepo.findOneBy({
            user : {id : userId}
        })
    }
}
