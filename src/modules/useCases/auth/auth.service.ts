import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { LoginDto } from './dto/login.dto';
import { JwtTokenService } from '../../configs/security/jwt/jwt.token.service';
import { BcryptService } from '../../configs/security/bcrypt/bcrypt.service';
import { UnauthorizedError } from '../../configs/interceptors/types/UnauthorizedError';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly bcryptService: BcryptService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (
      !user ||
      !this.bcryptService.compare(loginDto.password, user.password)
    ) {
      throw new UnauthorizedError('E-mail e senha inválidos');
    }
    const payload = {
      id: user.id,
      role: user.role,
      email: user.email,
    };

    const access_token = this.jwtTokenService.createToken(
      payload,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRATION_TIME,
    );

    const refresh_token = this.jwtTokenService.createToken(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    );

    await this.databaseService.user.update({
      where: { id: user.id },
      data: { hashRefreshToken: refresh_token },
    });

    return { access_token, refresh_token };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtTokenService.checkToken(refreshToken);

      const user = await this.databaseService.user.findFirst({
        where: { id: payload.id },
      });

      if (!user) {
        throw new ForbiddenException('Refresh token inválido');
      }

      const newAccessToken = this.jwtTokenService.createToken(
        { id: user.id, role: user.role, email: user.email },
        process.env.JWT_SECRET,
        process.env.JWT_EXPIRATION_TIME,
      );

      return { access_token: newAccessToken };
    } catch (error) {
      throw new ForbiddenException('Refresh token inválido ou expirado');
    }
  }
}
