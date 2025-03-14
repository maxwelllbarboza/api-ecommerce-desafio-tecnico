import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { JwtTokenModule } from '../../configs/security/jwt/jwt.token.module';
import { AuthGuard } from '../auth/auth.guard';
import { DatabaseModule } from '../../configs/database/database.module';
import { LoggerModule } from 'src/modules/configs/logger/logger.module';

@Module({
  imports: [JwtTokenModule, DatabaseModule, LoggerModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, AuthGuard],
  exports: [UserRepository],
})
export class UsersModule {}
