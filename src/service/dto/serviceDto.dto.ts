import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class serviceDto {
  @IsNumber()
  @IsOptional()
  id_service: number;

  @IsString()
  @IsNotEmpty()
  name_service: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
