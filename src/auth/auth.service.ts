import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { ProfessionalService } from 'src/professional/professional.service'; 
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly secretKey = 'Clavesecreta'; 

  constructor(
    private adminService: AdminService,
    private professionalService: ProfessionalService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signInAdmin(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    console.log('Iniciando sesión con:', email);

    const admin = await this.adminService.findOneEmail(email);
    if (admin) {
      console.log('Admin encontrado:', admin.email);
      if (bcrypt.compareSync(pass, admin.password)) {
        console.log('Contraseña válida para admin');
        const payload = {
          sub: admin.id_admin,
          email: admin.email,
          role: 'admin',
        };
        const access_token = await this.jwtService.sign(payload);
        return { access_token };
      }
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  async signInUser(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    console.log('Iniciando sesión con:', email);

    const user = await this.userService.findOneEmail(email);
    if (user) {
      console.log('Usuario encontrado:', user.email);
      if (bcrypt.compareSync(pass, user.password)) {
        console.log('Contraseña válida para usuario');
        const payload = {
          sub: user.id_user,
          email: user.email,
          role: 'user',
        };
        const access_token = await this.jwtService.signAsync(payload, {
          secret: this.secretKey,
        });
        return { access_token };
      }
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  async signInProfessional(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    console.log('Iniciando sesión con:', email);

    const professional = await this.professionalService.findOneEmail(email);
    if (professional) {
      console.log('Profesional encontrado:', professional.email);
      if (bcrypt.compareSync(pass, professional.password)) {
        console.log('Contraseña válida para profesional');
        const payload = {
          sub: professional.id_professional,
          email: professional.email,
          role: 'professional',
        };
        const access_token = await this.jwtService.signAsync(payload, {
          secret: this.secretKey, 
        });
        return { access_token };
      }
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }
}
