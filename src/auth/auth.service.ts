import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const admin = await this.adminService.findOneEmail(email);
    if (!admin || !bcrypt.compareSync(pass, admin.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: admin.id_admin, email: admin.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
