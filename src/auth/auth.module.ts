import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [AdminModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
