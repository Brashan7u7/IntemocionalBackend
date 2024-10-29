import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class reviewDto {
  @IsNumber()
  @IsOptional()
  id_review: number;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  id_user: number;

  @IsNumber()
  @IsNotEmpty()
  id_professional: number;

  @IsNumber()
  @IsOptional()
  id_admin: number;
}
