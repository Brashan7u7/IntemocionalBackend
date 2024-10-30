import {
  CanActivate, // Interfaz que se utiliza para definir un guard que protege rutas.
  ExecutionContext, // Proporciona información sobre la ejecución de la solicitud.
  Injectable, // Decorador que indica que la clase puede ser inyectada como un servicio.
  UnauthorizedException, // Excepción que se lanza cuando el acceso no está autorizado.
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Servicio para manejar la verificación y firma de JWT.
import { jwtConstants } from './auth.module'; // Importa las constantes de configuración del JWT desde el módulo de autenticación.

// Decorador que convierte a la clase en un servicio injectable.
@Injectable()
export class AuthGuard implements CanActivate {
  // Implementa la interfaz CanActivate
  constructor(private jwtService: JwtService) {} // Inyección del servicio JwtService

  // Método que verifica si la solicitud puede ser atendida
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtiene el objeto de solicitud HTTP del contexto de ejecución
    const request = context.switchToHttp().getRequest();

    // Extrae el token del encabezado de la solicitud
    const token = this.extractTokenFromHeader(request);

    // Si no se encuentra un token, lanza una excepción de no autorizado
    if (!token) {
      throw new UnauthorizedException(); // Respuesta 401
    }

    try {
      // Verifica el token utilizando el servicio JwtService y la clave secreta
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret, // Secreto para verificar la firma del token
      });

      // Asigna el payload decodificado a la solicitud para que esté disponible en otros controladores
      request['admin'] = payload; // Aquí se puede almacenar la información del administrador
    } catch {
      // Si la verificación falla, lanza una excepción de no autorizado
      throw new UnauthorizedException(); // Respuesta 401
    }

    // Si se pasa la verificación, retorna verdadero para permitir el acceso
    return true;
  }

  // Método privado que extrae el token del encabezado de autorización
  private extractTokenFromHeader(request: Request): string | undefined {
    // Asegura que el encabezado authorization sea del tipo correcto y extrae el token
    const authorization = (request.headers as any).authorization; // Aserción de tipo para evitar errores de TypeScript
    const [type, token] = authorization?.split(' ') ?? []; // Separa el tipo (Bearer) y el token en dos variables

    // Retorna el token solo si el tipo es "Bearer", de lo contrario retorna undefined
    return type === 'Bearer' ? token : undefined;
  }
}
