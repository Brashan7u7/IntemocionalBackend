import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from './entity/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from './service.controller';
import { Professional } from 'src/professional/entity/professional.entity';
import { Admin } from 'src/admin/entity/admin.entity';
import { ProfessionalService } from 'src/professional/professional.service';
import { AppointmentService } from 'src/appointment/appointment.service';
import { AppointmentModule } from 'src/appointment/appointment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    TypeOrmModule.forFeature([Professional]),
    TypeOrmModule.forFeature([Admin]),
    AppointmentModule
  ],
  providers: [ServiceService, ProfessionalService,AppointmentService],
  controllers: [ServiceController],
})
export class ServiceModule {}
