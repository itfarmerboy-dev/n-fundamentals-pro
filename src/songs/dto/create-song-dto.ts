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
    @IsNumber({},{each : true})
    readonly artists :number[];

    @IsNotEmpty()
    @IsDateString()
    readonly releasedDate :string;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration :string;


    @IsString()
    @IsOptional()
    readonly lyrics : string 
}