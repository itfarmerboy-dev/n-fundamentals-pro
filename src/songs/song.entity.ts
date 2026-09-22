import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "../playlist/playlist.entity.js";
import { Artist } from "../artists/artist.entity.js";

@Entity('songs')
export class Song{
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    // @Column('varchar',{array : true})
    // artists : string[];

    @Column({type : 'date'})
    releasedDate : string;

    @Column({type : 'time'})
    duration : string;

    @Column({type : 'text'})
    lyrics : string;

    @ManyToMany(()=>Artist,(artist)=> artist.songs,{cascade : true})
    @JoinTable({name : 'songs_artists'})
    artists : Artist[]
    
    @ManyToOne(()=>Playlist,(playlist) => playlist.songs )
    playlist : Playlist;

}