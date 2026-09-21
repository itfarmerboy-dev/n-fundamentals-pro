import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Song } from './song.entity.js';
import { CreateSongDTO } from './dto/create-song-dto.js';
import { UpdateSongDTO } from './dto/update-song-dto.js';
import { UpdateResult } from 'typeorm';

@Injectable()
export class SongsService {
    
    constructor(
        @InjectRepository(Song)
        private songsRepo : Repository<Song>
    ){}

    async create(songDTO : CreateSongDTO):Promise<Song> {
        //create song object
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        song.releasedDate = songDTO.releasedDate;
        
        return await this.songsRepo.save(song);
    }

    findAll() :Promise<Song[]>{
        return this.songsRepo.find();
    }

    async findOne(id : number): Promise<Song>{
        const foundedSong = await this.songsRepo.findOneBy({id})
        if(!foundedSong)
         throw new NotFoundException('User not found');
        return foundedSong;
    }


    remove(id : number):Promise<DeleteResult>{
         return  this.songsRepo.delete(id);
    }

    update(id:number,updateSongDTO:UpdateSongDTO):Promise<UpdateResult>{
        return this.songsRepo.update(id,updateSongDTO)
    }
}
