import { MiddlewareConsumer, Module, NestModule, Next, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SongsController } from './songs/songs.controller.js';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware.js';
import { SongsModule } from './songs/songs.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity.js';
import { UserModule } from './user/users.module.js';
import { User } from './user/user.entity.js';
import { PlaylistModule } from './playlist/playlists.module.js';
import { Playlist } from './playlist/playlist.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        database : 'spotify-clone',
        type : 'postgres',
        host : 'localhost',
        port : 5432,
        username : 'postgres',
        password : 'postgres123',
        entities : [Song,User,Playlist],
        synchronize : true,
      })
    ,SongsModule, UserModule, PlaylistModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule{
  constructor(datasource : DataSource){
    console.log('Database Name is ==> ',datasource.driver.database);  
  }

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware)
    // .forRoutes('songs')  Option1

    // consumer.apply(LoggerMiddleware)
    // .forRoutes({path : 'songs',method : RequestMethod.POST})  Option2

    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
} 