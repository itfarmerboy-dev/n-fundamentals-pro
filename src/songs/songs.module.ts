import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller.js';
import { SongsService } from './songs.service.js';


@Module({
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
