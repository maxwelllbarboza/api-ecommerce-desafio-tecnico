import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptService } from '../../common/services/bcrypt/bcrypt.service';
import { JwtTokenModule } from '../../common/services/jwt/jwt.token.module';
import { BcryptModule } from '../../common/services/bcrypt/bcrypt.module';
import { LoggerService } from '../..//infra/logger/logger.service';
import { DatabaseModule } from '../..//infra/database/database.module';

@Module({
  imports: [JwtTokenModule, BcryptModule, DatabaseModule],
  providers: [AuthService, BcryptService, LoggerService],
  controllers: [AuthController],
})
export class AuthModule {}
