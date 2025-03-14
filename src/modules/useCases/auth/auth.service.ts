import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../configs/database/database.service';
import { LoginDto } from './dto/login.dto';
import { JwtTokenService } from '../../configs/security/jwt/jwt.token.service';
import { BcryptService } from '../../configs/security/bcrypt/bcrypt.service';
import { UnauthorizedError } from '../../configs/interceptors/types/UnauthorizedError';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly bcryptService: BcryptService,
    private readonly configService: ConfigService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.databaseService.user.findUnique({
      where: { email: loginDto.email },
    });

    if (
      !user ||
      !this.bcryptService.compare(loginDto.password, user.password)
    ) {
      throw new UnauthorizedError('E-mail e senha inválidos');
    }

    const payload = { id: user.id, role: user.role, email: user.email };

    const access_token = this.jwtTokenService.createToken(payload);
    const refresh_token = this.jwtTokenService.createToken(payload, true);

    await this.databaseService.user.update({
      where: { id: user.id },
      data: { hashRefreshToken: refresh_token },
    });

    return { access_token, refresh_token };
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    const payload = await this.jwtTokenService.checkToken(refreshToken);

    const user = await this.databaseService.user.findFirst({
      where: { id: payload.id },
    });

    if (!user) {
      throw new ForbiddenException('Refresh token inválido');
    }

    const newAccessToken = this.jwtTokenService.createToken({
      id: user.id,
      role: user.role,
      email: user.email,
    });

    return { access_token: newAccessToken };
  }

  async logout(userId: string) {
    try {
      await this.databaseService.user.update({
        where: { id: userId },
        data: { hashRefreshToken: null },
      });
      return { message: 'Logout realizado com sucesso' };
    } catch (error) {
      throw new ForbiddenException('Erro ao tentar realizar o logout');
    }
  }
}
