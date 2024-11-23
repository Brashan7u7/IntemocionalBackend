import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from './entity/professional.entity';
import { Admin } from 'src/admin/entity/admin.entity';
import { Service } from 'src/service/entity/service.entity';
import { Review } from 'src/review/entity/review.entity';
import { User } from 'src/user/entity/user.entity';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { AdminService } from 'src/admin/admin.service';
import { ServiceService } from 'src/service/service.service';
import { ReviewService } from 'src/review/review.service';
import { UserService } from 'src/user/user.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Professional, Admin, Service, Review, User]),
    AppointmentModule,
  ],
  providers: [
    ProfessionalService,
    AdminService,
    ServiceService,
    ReviewService,
    UserService,
    
  ],
  controllers: [ProfessionalController],
  exports: [ProfessionalService],
})
export class ProfessionalModule {}
