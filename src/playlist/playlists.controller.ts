import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service.js';
import { createPlaylistDTO } from './dto/create-playlist.dto.js';
import { Playlist } from './playlist.entity.js';

@Controller('playlists')
export class PlaylistController {
    constructor(
        private playListService : PlaylistsService
    ){}

    @Post()
    create(
        @Body()
        playListDTO : createPlaylistDTO
    ):Promise<Playlist>
    {
        return this.playListService.create(playListDTO);
    }
}
