import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class professionalDto {
  @IsNumber()
  @IsOptional()
  id_professional: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  speciality: string;

  @IsNumber()
  @IsOptional()
  experience_years: number;

  @IsNumber()
  @IsOptional()
  id_admin: number ;

  serviceIds?: number[];
}
