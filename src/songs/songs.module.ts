import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller.js';
import { SongsService } from './songs.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity.js';
import { Artist } from '../artists/artist.entity.js';


@Module({ 
  imports :[TypeOrmModule.forFeature([Song,Artist])],
  controllers: [SongsController],
  providers: [SongsService, 
    //standard injection 
    {
      provide : SongsService,
      useClass : SongsService
    }
  ]
})

export class SongsModule {}
