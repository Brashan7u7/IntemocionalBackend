import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { ReviewModule } from './review/review.module';
import { ProfessionalModule } from './professional/professional.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, jwtConstants } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

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
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'TeExtranoNicoleunu',
      signOptions: { expiresIn: '1h' },
    }),
    ServiceModule,
    ReviewModule,
    ProfessionalModule,
    AppointmentModule,
    AdminModule,
    AuthModule,
  ],
})
export class AppModule {}
