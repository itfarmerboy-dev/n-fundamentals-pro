import { Module } from '@nestjs/common';
import { PlaylistController } from './playlists.controller.js';
import { PlaylistService } from './playlists.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from '../songs/song.entity.js';
import { User } from '../user/user.entity.js';

@Module({
  imports:[TypeOrmModule.forFeature([Song,User])],
  controllers: [PlaylistController],
  providers: [PlaylistService]
})
export class PlaylistModule {}
