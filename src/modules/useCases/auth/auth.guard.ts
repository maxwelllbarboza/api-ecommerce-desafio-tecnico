import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedError } from '../../configs/interceptors/types/UnauthorizedError';
import { JwtTokenService } from '../../configs/security/jwt/jwt.token.service';
import { LoggerService } from '../../configs/logger/logger.service';
import { startLog } from 'src/modules/configs/logger/log-template';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly logger: LoggerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.warn(startLog, 'Token não fornecido');
      throw new UnauthorizedError('Token não fornecido');
    }

    try {
      const payload = await this.jwtTokenService.checkToken(token);
      request['user'] = payload;
    } catch (error) {
      this.logger.warn(startLog, 'Token inválido');
      throw new UnauthorizedError('Token inválido');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      this.logger.warn(startLog, 'Cabeçalho de autorização não encontrado');
      return undefined;
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      this.logger.warn(
        startLog,
        'Formato de cabeçalho de autorização inválido',
      );
      return undefined;
    }

    return parts[1];
  }
}
