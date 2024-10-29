import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { professionalDto } from './dto/professionalDto.dto';
import { Professional } from './entity/professional.entity';

@Controller('professional')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Post()
  create(@Body() professionaldto: professionalDto) {
    return this.professionalService.create(professionaldto);
  }

  @Post(':professionalId/services/:serviceId')
  async addService(
    @Param('professionalId') professionalId: number,
    @Param('serviceId') serviceId: number,
  ) {
    return this.professionalService.addServiceToProfessional(
      professionalId,
      serviceId,
    );
  }

  @Get()
  findAll(): Promise<Professional[]> {
    return this.professionalService.findAll();
  }

  @Get(':professionalId/services')
  async findServices(@Param('professionalId') professionalId: number) {
    return this.professionalService.findServicesByProfessional(professionalId);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.professionalService.delete(id);
    return { message: `Professional with id ${id} delete sucessfully` };
  }
  @Delete(':professionalId/services/:serviceId')
  async deleteService(
    @Param('professionalId') professionalId: number,
    @Param('serviceId') serviceId: number,
  ) {
    await this.professionalService.deleteServicesByProfessional(
      serviceId,
      professionalId,
    );
    return {
      message: `Service with id ${serviceId} deleted from professional with id ${professionalId} successfully`,
    };
  }
}
