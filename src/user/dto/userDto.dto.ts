import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class userDto{
    @IsNumber()
    @IsOptional()
    id_user?:number

    @IsString()
    @IsNotEmpty()
    username:string

    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    lastname:string

    @IsEmail()
    @IsString()
    @IsNotEmpty() 
    email:string

    @IsString()
    @IsNotEmpty() 
    @MinLength(8)
    password:string

    @IsString()
    location?:string
}