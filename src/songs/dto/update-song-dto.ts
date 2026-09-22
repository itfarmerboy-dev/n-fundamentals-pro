import { IsArray, IsDateString, IsMilitaryTime, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSongDTO{

    @IsOptional()
    @IsString()
    readonly title :string;

    @IsOptional()
    @IsArray()
    @IsNumber({},{each : true})
    readonly artists :number[];

    @IsOptional()
    @IsDateString()
    readonly releasedDate :string;

    @IsMilitaryTime()
    @IsOptional()
    readonly duration :string;


    @IsOptional()
    @IsString()
    @IsOptional()
    readonly lyrics : string 
}