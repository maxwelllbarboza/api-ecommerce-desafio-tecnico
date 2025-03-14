import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  createToken(payload: any, isRefreshToken: boolean = false): string {
    const secret = isRefreshToken
      ? this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
      : this.configService.get<string>('JWT_SECRET');

    const expiresIn = isRefreshToken
      ? this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME')
      : this.configService.get<string>('JWT_EXPIRATION_TIME');

    console.log('expiresIn:', expiresIn);

    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }

  checkToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }
}
