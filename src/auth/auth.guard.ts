import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants.secret';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    console.log('Token extraído:', token);
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'Clavesecreta',
      });

      console.log('Payload del token:', payload); 

      const requiredRole = this.reflector.get<string[]>(
        'role',
        context.getHandler(),
      );

      console.log('Rol requerido:', requiredRole); 

      if (requiredRole && !requiredRole.includes(payload.role)) {
        throw new ForbiddenException(
          `Acceso denegado para el rol: ${payload.role}`,
        );
      }

      request['user'] = payload;

      console.log('Acceso permitido para:', payload.role); 

      return true;
    } catch (error) {
      console.error('Error al verificar el token:', error.message); 
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('Token no proporcionado');
    }
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato de token inválido');
    }
    return token;
  }
}
