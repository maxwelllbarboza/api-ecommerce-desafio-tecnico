import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthService } from './auth.service';
import { UserId } from 'src/modules/configs/security/user-id.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('refreshtoken')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async refresh(
    @Body() { refresh_token }: RefreshTokenDto,
  ): Promise<{ access_token: string }> {
    return this.authService.refreshToken(refresh_token);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@UserId() userId: string) {
    if (!userId) {
      throw new UnauthorizedException('UserId é obrigatório');
    }

    try {
      return await this.authService.logout(userId);
    } catch (error) {
      throw new UnauthorizedException('Erro ao tentar realizar o logout');
    }
  }
}
