import { IsArray, IsDateString, IsMilitaryTime, IsOptional, IsString } from "class-validator";

export class UpdateSongDTO{

    @IsOptional()
    @IsString()
    readonly title :string;

    @IsOptional()
    @IsArray()
    @IsString({each : true})
    readonly artists :string[];

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