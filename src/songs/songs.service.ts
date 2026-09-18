import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
    
    private readonly songs :any[]= [];

    create(song: any){
        this.songs.push(song)
        return this.songs;
    }

    findAll(){

        // Error Copmes while fetching data from the db  
        // throw new Error('Error in db while data is fetching')
        return this.songs;
    }

}
