import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ReviewController } from './review/review.controller';
import { AdminController } from './admin/admin.controller';
import { AppointmentController } from './appointment/appointment.controller';
import { ProfessionalController } from './professional/professional.controller';
import { ServiceController } from './service/service.controller';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { ReviewModule } from './review/review.module';
import { ProfessionalModule } from './professional/professional.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AdminModule } from './admin/admin.module';
import { UserService } from './user/user.service';
import { ServiceService } from './service/service.service';
import { ReviewService } from './review/review.service';
import { ProfessionalService } from './professional/professional.service';
import { AppointmentService } from './appointment/appointment.service';
import { AdminService } from './admin/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'DJE20ben',
      database: 'intemocional',
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    ServiceModule,
    ReviewModule,
    ProfessionalModule,
    AppointmentModule,
    AdminModule,
  ],
})
export class AppModule {}
