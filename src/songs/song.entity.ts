import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "../playlist/playlist.entity.js";
import { ManyToOne } from "typeorm/browser";

@Entity('songs')
export class Song{
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    @Column('varchar',{array : true})
    artists : string;

    @Column('date')
    releasedDate : string;

    @Column('time')
    duration : string;

    @Column('text')
    lyrics : string;

    @ManyToOne(()=>Playlist,(playlist) => playlist.songs )
    playlist : Playlist;

}