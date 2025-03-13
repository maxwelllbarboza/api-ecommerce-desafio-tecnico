import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { LoggerService } from '../../infra/logger/logger.service';
import { JwtTokenModule } from '../../common/services/jwt/jwt.token.module';
import { AuthGuard } from '../auth/auth.guard';
import { DatabaseModule } from '../../infra/database/database.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, LoggerService, AuthGuard],
  exports: [UserRepository],
  imports: [JwtTokenModule, DatabaseModule],
})
export class UsersModule {}
