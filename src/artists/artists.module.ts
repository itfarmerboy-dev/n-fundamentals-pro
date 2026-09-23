import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Artist } from "./artist.entity.js";
import { Song } from "../songs/song.entity.js";
import { ArtistsController } from './artists.controller.js';
import { ArtistsService } from './artists.service.js';

@Module({ 
  imports :[TypeOrmModule.forFeature([Song,Artist])],
  providers: [ArtistsService],
  controllers: [ArtistsController],
})

export class ArtistsModule {}
