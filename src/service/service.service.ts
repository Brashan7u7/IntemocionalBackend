import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entity/service.entity';
import { Repository } from 'typeorm';
import { serviceDto } from './dto/serviceDto.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: serviceDto): Promise<Service> {
    return this.serviceRepository.save(createServiceDto);
  }

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async delete(id: number): Promise<void> {
    const result = await this.serviceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
  }
}
