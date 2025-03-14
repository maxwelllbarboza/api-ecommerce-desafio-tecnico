import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { LoggerService } from '../../configs/logger/logger.service';
import { JwtTokenModule } from '../../configs/security/jwt/jwt.token.module';
import { AuthGuard } from '../auth/auth.guard';
import { DatabaseModule } from '../../configs/database/database.module';
import { LoggerModule } from 'src/modules/configs/logger/logger.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, LoggerService, AuthGuard],
  exports: [UserRepository],
  imports: [JwtTokenModule, DatabaseModule, LoggerModule],
})
export class UsersModule {}
