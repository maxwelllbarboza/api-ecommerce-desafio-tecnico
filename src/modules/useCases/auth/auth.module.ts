import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptService } from '../../configs/security/bcrypt/bcrypt.service';
import { JwtTokenModule } from '../../configs/security/jwt/jwt.token.module';
import { BcryptModule } from '../../configs/security/bcrypt/bcrypt.module';
import { DatabaseModule } from '../../configs/database/database.module';
import { LoggerModule } from 'src/modules/configs/logger/logger.module';

@Module({
  imports: [JwtTokenModule, BcryptModule, DatabaseModule, LoggerModule],
  providers: [AuthService, BcryptService],
  controllers: [AuthController],
})
export class AuthModule {}
