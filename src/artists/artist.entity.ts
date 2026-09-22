import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../user/user.entity.js";
import { Song } from "../songs/song.entity.js";
@Entity("artists")
export class Artist {

    @PrimaryGeneratedColumn()
    id : number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToMany(() => Song, (song) => song.artists)
    songs: Song[];
}