import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { ReviewModule } from './review/review.module';
import { ProfessionalModule } from './professional/professional.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-ct0uj7hu0jms73ca4kfg-a.oregon-postgres.render.com',
      port: 5432,
      username: 'intermocional_postgres_user',
      password: 'H6H5NcDbkb0vhiJR5OOPHQ8fF2YOnMdC',
      database: 'intermocional_postgres',
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, 
      },
    }),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'Clavesecreta',
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
