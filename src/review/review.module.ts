import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entity/review.entity';
import { User } from 'src/user/entity/user.entity';
import { Professional } from 'src/professional/entity/professional.entity';
import { Admin } from 'src/admin/entity/admin.entity';
import { UserService } from 'src/user/user.service';
import { ProfessionalService } from 'src/professional/professional.service';
import { AdminService } from 'src/admin/admin.service';
import { Service } from 'src/service/entity/service.entity';
import { ServiceService } from 'src/service/service.service';
import { AppointmentModule } from 'src/appointment/appointment.module'; // Importar AppointmentModule para resolver AppointmentService
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, User, Professional, Admin, Service]),
    AppointmentModule, // Importar el módulo que contiene AppointmentService
  ],
  providers: [
    ReviewService,
    UserService,
    ProfessionalService,
    AdminService,
    ServiceService,
  ],
  controllers: [ReviewController],
})
export class ReviewModule {}
