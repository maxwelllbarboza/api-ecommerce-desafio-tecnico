import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptService } from '../../configs/security/bcrypt/bcrypt.service';
import { JwtTokenModule } from '../../configs/security/jwt/jwt.token.module';
import { BcryptModule } from '../../configs/security/bcrypt/bcrypt.module';
import { LoggerService } from '../../configs/logger/logger.service';
import { DatabaseModule } from '../../configs/database/database.module';

@Module({
  imports: [JwtTokenModule, BcryptModule, DatabaseModule],
  providers: [AuthService, BcryptService, LoggerService],
  controllers: [AuthController],
})
export class AuthModule {}
