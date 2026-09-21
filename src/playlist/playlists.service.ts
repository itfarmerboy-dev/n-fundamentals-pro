import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity.js';
import { In, Repository } from 'typeorm';
import { Song } from '../songs/song.entity.js';
import { User } from '../user/user.entity.js';
import { createPlaylistDTO } from './dto/create-playlist.dto.js';

@Injectable()
export class PlaylistsService {

    constructor(
        @InjectRepository(Playlist)
        private playlistRepo : Repository<Playlist>,

        @InjectRepository(Song)
        private songsRepo : Repository<Song>,

        @InjectRepository(User)
        private userRepo : Repository<User>,
    ){}

    async create (playListDTO : createPlaylistDTO) : Promise<Playlist>{
        //get all songs
        const playlist = new Playlist();

        //set playlist name
        playlist.name = playListDTO.name;
        
        //set playlist songs
        //get songs from repo song
        const songs = await this.songsRepo.findBy({id: In(playListDTO.songs)}); 
        playlist.songs = songs;
        
        //Get playlist user
        const user = await this.userRepo.findOneBy({id: playListDTO.user});

        if (!user) {
        throw new NotFoundException('User not found');
}
        //set playlist lyrics 
        playlist.lyrics = playListDTO.lyrics;

        return playlist;
    }
}
