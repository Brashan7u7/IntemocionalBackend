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
  @IsOptional()
  rating: number;

  @IsString()
  @IsOptional()
  date: string;

  @IsNumber()
  @IsOptional()
  id_user: number;

  @IsNumber()
  @IsOptional()
  id_professional: number;

  @IsNumber()
  @IsOptional()
  id_admin: number;
}
