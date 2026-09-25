import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO{
  
    @IsString()
    @IsNotEmpty()
    firstName : string;
    
    @IsString()
    @IsNotEmpty()
    lastName : string;
    
    @IsString()
    @IsNotEmpty()
    apiKey : string;

    @IsString()
    @IsNotEmpty()
    email : string;
        
    @IsString()
    @IsNotEmpty()
    password : string;
}