import { Body,Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service.js';
import { CreateSongDTO } from './dto/create-song-dto.js';

@Controller('songs')
export class SongsController {

    constructor(private songsService: SongsService){}

    @Post()
    create(@Body() createSongDTO : CreateSongDTO ){
        return this.songsService.create(createSongDTO)
    }
    
    @Get(":id")
    
    findOne(
        @Param(
            'id',
            new ParseIntPipe({errorHttpStatusCode :HttpStatus.NOT_ACCEPTABLE})
        )
        id : Number
    ){
        return `Fetch song based on the ${id} ${typeof id}`;  
    }
    
    @Get()
    findAll(){
        return this.songsService.findAll();
    }

    @Put(":id")
    updateOne(){
        return "Song succefully Updates "  
    }

    @Delete(":id")
    deleteOne(){
        return "Song was deleted";  
    }
}
