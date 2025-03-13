import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedError } from '../../common/interceptors/errors/types/UnauthorizedError';
import { JwtTokenService } from '../../common/services/jwt/jwt.token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedError('Token não fornecido');
    }

    try {
      const payload = await this.jwtTokenService.checkToken(token);
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedError('Token inválido');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      console.warn('Invalid authorization header format');
      return undefined;
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      console.warn('Invalid authorization header format');
      return undefined;
    }

    return parts[1];
  }
}
