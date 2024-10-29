import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { appointmentDto } from './dto/appointmentDto.dto';
import { Appointment } from './entity/appointment.entity';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() appointmentdto: appointmentDto) {
    return this.appointmentService.create(appointmentdto);
  }

  @Get()
  findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.appointmentService.delete(id);
    return { message: `Appointment with id ${id} delete successfully` };
  }
}
