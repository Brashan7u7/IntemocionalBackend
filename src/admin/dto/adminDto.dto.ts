import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';


export class adminDto{
    @IsNumber()
    @IsOptional()
    id_admin:number

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
    @MinLength(6,{message:'La contraseña debe de tener minimo 6 caracteres'})
    password:string


}