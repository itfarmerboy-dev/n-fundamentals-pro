import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import { Song } from './song.entity.js';
import { CreateSongDTO } from './dto/create-song-dto.js';
import { UpdateSongDTO } from './dto/update-song-dto.js';
import { UpdateResult } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Artist } from '../artists/artist.entity.js';

@Injectable()
export class SongsService {
    
    constructor(
        @InjectRepository(Song)
        private songsRepo : Repository<Song>,
        @InjectRepository(Artist)
        private artistsRepo : Repository<Artist>
    ){}

    async paginate(options : IPaginationOptions):Promise<Pagination<Song>>{
        const queryBuilder = this.songsRepo.createQueryBuilder('c');
        queryBuilder.orderBy('c.releasedDate','DESC');

        return paginate<Song>(queryBuilder,options);
    }

    async create(songDTO : CreateSongDTO):Promise<Song> {
        //create song object
        const song = new Song();
        song.title = songDTO.title;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        song.releasedDate = songDTO.releasedDate;
                
        //find All artists
        const artists = await this.artistsRepo.findBy({
            id : In(songDTO.artists)
        })

        console.error(artists);
        
        song.artists = artists;

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

    async update(id: number, updateSongDTO: UpdateSongDTO): Promise<Song> {
    const song = await this.songsRepo.findOne({
        where: { id },
        relations: {
            artists: true,
        },
    });

    if (!song) {
        throw new NotFoundException('Song not found');
    }

    song.title = updateSongDTO.title ?? song.title;
    song.duration = updateSongDTO.duration ?? song.duration;
    song.lyrics = updateSongDTO.lyrics ?? song.lyrics;
    song.releasedDate = updateSongDTO.releasedDate ?? song.releasedDate;

    if (updateSongDTO.artists) {
        const artists = await this.artistsRepo.findBy({
            id: In(updateSongDTO.artists),
        });

        song.artists = artists;
    }

    // save() returns the updated Song object directly
    return await this.songsRepo.save(song);
}

}
