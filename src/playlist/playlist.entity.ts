import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity.js";
import { Song } from "../songs/song.entity.js";


@Entity('playlists')
export class Playlist{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column('text')
    lyrics : string;

    @ManyToOne(()=> User,(user)=> user.playlists )
    user : User;

    @OneToMany( ()=> Song,(song)=> song.playlist )
    songs : Song[];
}