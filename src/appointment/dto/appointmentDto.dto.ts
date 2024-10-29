import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class appointmentDto {
  @IsNumber()
  @IsOptional()
  id_appointment: number;



  @IsString()
  @IsNotEmpty()
  end_time: string;

  @IsString()
  @IsNotEmpty()
  starting_time: string;

  @IsString()
  @IsNotEmpty()
  appointment_status: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  id_professional: number;

  @IsNumber()
  @IsNotEmpty()
  id_user: number;
}
