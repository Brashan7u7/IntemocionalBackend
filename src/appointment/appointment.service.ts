import { Injectable, NotFoundException } from '@nestjs/common';
import { appointmentDto } from './dto/appointmentDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entity/appointment.entity';
import { Repository } from 'typeorm';
import { Professional } from 'src/professional/entity/professional.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(CreateAppointmentDto: appointmentDto): Promise<Appointment> {
    const professionalFind = await this.professionalRepository.findOne({
      where: { id_professional: CreateAppointmentDto.id_professional },
    });
    const userFind = await this.userRepository.findOne({
      where: { id_user: CreateAppointmentDto.id_user },
    });
    if (!professionalFind) {
      throw new NotFoundException(`Appointment no encontrado`);
    }
    if (!userFind) {
      throw new NotFoundException(`User no encontrado`);
    }
    const body = this.appointmentRepository.create(CreateAppointmentDto);
    body.professional = professionalFind;
    body.user = userFind;
    return this.appointmentRepository.save(body);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async cancelAppointmentsByProfessional(
    professionalId: number,
  ): Promise<void> {
    await this.appointmentRepository
      .createQueryBuilder()
      .update(Appointment)
      .set({ appointment_status: 'Cancelado' })
      .where('professionalId = :professionalId', { professionalId })
      .execute();
  }

  async delete(id: number): Promise<void> {
    const result = await this.appointmentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }
  }
}
