import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { serviceDto } from './dto/serviceDto.dto';
import { ServiceService } from './service.service';
import { Service } from './entity/service.entity';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() servicedto: serviceDto) {
    return this.serviceService.create(servicedto);
  }

  @Get()
  findAll():Promise<Service[]>{
    return this.serviceService.findAll()
  }

  @Delete(':id')
  async delete(@Param('id') id:number){
    await this.serviceService.delete(id);
    return { message: `Service with id ${id} delete successfully` };  
  }
}
