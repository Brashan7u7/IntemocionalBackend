import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class appointmentDto {
  @IsNumber()
  @IsOptional()
  id_appointment: number;



  @IsString()
  @IsOptional()
  end_time: string;

  @IsString()
  @IsOptional()
  starting_time: string;

  @IsString()
  @IsOptional()
  appointment_status: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsNumber()
  @IsOptional()
  id_professional: number;

  @IsNumber()
  @IsOptional()
  id_user: number;
}
