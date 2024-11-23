import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants.secret'; 
import { UserModule } from 'src/user/user.module';
import { ProfessionalModule } from 'src/professional/professional.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => UserModule),
    forwardRef(() => ProfessionalModule),
    JwtModule.register({
      secret: 'Clavesecreta',
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, JwtModule], 
})
export class AuthModule {}
export { jwtConstants };
