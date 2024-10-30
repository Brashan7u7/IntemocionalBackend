import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entity/admin.entity';
import { Professional } from 'src/professional/entity/professional.entity';
import { ProfessionalService } from 'src/professional/professional.service';
import { Review } from 'src/review/entity/review.entity';
import { ReviewService } from 'src/review/review.service';
import { Service } from 'src/service/entity/service.entity';
import { ServiceModule } from 'src/service/service.module';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { AppointmentModule } from 'src/appointment/appointment.module'; // Importa AppointmentModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Professional, Review, Service, User]),
    ServiceModule,
    AppointmentModule, // Agrega AppointmentModule aquí
  ],
  providers: [AdminService, ProfessionalService, ReviewService, UserService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
