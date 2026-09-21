import { Module } from '@nestjs/common';
import { PlaylistController } from './playlists.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from '../songs/song.entity.js';
import { User } from '../user/user.entity.js';
import { PlaylistsService } from './playlists.service.js';
import { Playlist } from './playlist.entity.js';

@Module({
  imports : [TypeOrmModule.forFeature([Playlist,Song,User])],
  controllers: [PlaylistController],
  providers: [PlaylistsService]
})
export class PlaylistModule {}
