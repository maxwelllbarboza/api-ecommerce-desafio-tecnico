import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtService, IJwtServicePayload } from './jwt.token.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async checkToken(token: string): Promise<IJwtServicePayload> {
    return this.jwtService.verifyAsync<IJwtServicePayload>(token);
  }

  createToken(payload: IJwtServicePayload, isRefreshToken = false): string {
    const secret = this.configService.get<string>(
      isRefreshToken ? 'JWT_REFRESH_TOKEN_SECRET' : 'JWT_SECRET',
    );
    const expiresIn = this.configService.get<string>(
      isRefreshToken
        ? 'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
        : 'JWT_EXPIRATION_TIME',
    );

    if (!secret || !expiresIn) {
      throw new Error('JWT configuration is missing');
    }

    return this.jwtService.sign(payload, { secret, expiresIn });
  }
}
