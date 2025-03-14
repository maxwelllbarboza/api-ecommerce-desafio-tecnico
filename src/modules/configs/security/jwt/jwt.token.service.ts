import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService, IJwtServicePayload } from './jwt.token.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  private readonly JWT_SECRET = '74YLbq4%c!wU';
  private readonly JWT_EXPIRATION_TIME = '4h';
  private readonly JWT_REFRESH_TOKEN_SECRET = '7jML9q4-c!s0';
  private readonly JWT_REFRESH_TOKEN_EXPIRATION_TIME = '8h';

  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<IJwtServicePayload> {
    return this.jwtService.verifyAsync<IJwtServicePayload>(token, {
      secret: this.JWT_SECRET,
    });
  }

  createToken(payload: IJwtServicePayload, isRefreshToken = false): string {
    const secret = isRefreshToken
      ? this.JWT_REFRESH_TOKEN_SECRET
      : this.JWT_SECRET;
    const expiresIn = isRefreshToken
      ? this.JWT_REFRESH_TOKEN_EXPIRATION_TIME
      : this.JWT_EXPIRATION_TIME;

    return this.jwtService.sign(payload, { secret, expiresIn });
  }
}
