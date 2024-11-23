import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from './entity/professional.entity';
import { Repository } from 'typeorm';
import { professionalDto } from './dto/professionalDto.dto';
import { Admin } from 'src/admin/entity/admin.entity';
import { Service } from 'src/service/entity/service.entity';
import { AppointmentService } from 'src/appointment/appointment.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    private readonly appointmentService: AppointmentService,
  ) {}

  async create(CreateProfessionalDto: professionalDto): Promise<Professional> {
    const adminFind = await this.adminRepository.findOne({
      where: { id_admin: CreateProfessionalDto.id_admin },
    });
    if (!adminFind) {
      throw new NotFoundException('Admin no encontrado');
    }

    const professional = this.professionalRepository.create(
      CreateProfessionalDto,
    );

    const saltRounds = 10;
    professional.password = await bcrypt.hash(
      CreateProfessionalDto.password,
      saltRounds,
    );

    professional.admin = adminFind;
    return this.professionalRepository.save(professional);
  }

  async addServiceToProfessional(
    id_professional: number,
    serviceId: number,
  ): Promise<Professional> {
    const professional = await this.professionalRepository.findOne({
      where: {
        id_professional: id_professional,
      },
      relations: ['services'],
    });

    if (!professional) {
      throw new NotFoundException('Professional not found');
    }

    console.log('Professional found:', professional);

    const service = await this.serviceRepository.findOne({
      where: { id_service: serviceId },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    console.log('Service found:', service);

    professional.services.push(service);

    console.log('Professional Final:', professional);

    return this.professionalRepository.save(professional);
  }

  async findAll(): Promise<Professional[]> {
    return this.professionalRepository.find();
  }

  async findServicesByProfessional(
    id_professional: number,
  ): Promise<Service[]> {
    const professional = await this.professionalRepository.findOne({
      where: { id_professional: id_professional },
      relations: ['services'],
    });

    if (!professional) {
      throw new NotFoundException('Professional not found');
    }

    return professional.services;
  }

  async delete(id: number): Promise<void> {
    const professional = await this.professionalRepository.findOne({
      where: { id_professional: id },
    });
    if (!professional) {
      throw new NotFoundException(`Professional with id ${id} not found`);
    }

    await this.appointmentService.cancelAppointmentsByProfessional(id);

    await this.professionalRepository.remove(professional);
  }

  async deleteServicesByProfessional(
    idServices: number,
    idProfessional: number,
  ): Promise<void> {
    const professional = await this.professionalRepository.findOne({
      where: { id_professional: idProfessional },
      relations: ['services'],
    });

    if (!professional) {
      throw new Error(`Professional with id ${idProfessional} not found`);
    }

    professional.services = professional.services.filter(
      (service) => service.id_service !== idServices,
    );

    await this.professionalRepository.save(professional);
  }

  async findOneEmail(email: string): Promise<Professional> {
    const professional = await this.professionalRepository.findOne({
      where: { email },
    });

    if (!professional) {
      throw new NotFoundException(`Professional with email ${email} not found`);
    }

    return professional;
  }
}
