import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "../playlist/playlist.entity.js";

@Entity('songs')
export class Song{
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    @Column('varchar',{array : true})
    artists : string[];

    @Column({type : 'date'})
    releasedDate : string;

    @Column({type : 'time'})
    duration : string;

    @Column({type : 'text'})
    lyrics : string;

    @ManyToOne(()=>Playlist,(playlist) => playlist.songs )
    playlist : Playlist;

}