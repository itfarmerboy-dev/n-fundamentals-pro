import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSongDTO{

    // @IsNumber()
    // @IsNotEmpty()
    // readonly id: number;

    @IsNotEmpty()
    @IsString()
    readonly title :string;

    @IsNotEmpty()
    @IsArray()
    @IsString({each : true})
    readonly artists :string[];

    @IsNotEmpty()
    @IsDateString()
    readonly releasedDate :Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration :Date;


    @IsString()
    @IsOptional()
    readonly lyrics : string 
}