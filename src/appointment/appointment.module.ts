import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entity/appointment.entity';
import { Professional } from 'src/professional/entity/professional.entity';
import { User } from 'src/user/entity/user.entity';
import { Admin } from 'src/admin/entity/admin.entity';
import { Service } from 'src/service/entity/service.entity';
import { ProfessionalService } from 'src/professional/professional.service';
import { UserService } from 'src/user/user.service';
import { AdminService } from 'src/admin/admin.service';
import { ServiceService } from 'src/service/service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Professional, User, Admin, Service]),
  ],
  providers: [
    AppointmentService,
    ProfessionalService,
    UserService,
    AdminService,
    ServiceService,
  ],
  controllers: [AppointmentController],
  exports: [AppointmentService, TypeOrmModule],
})
export class AppointmentModule {}
