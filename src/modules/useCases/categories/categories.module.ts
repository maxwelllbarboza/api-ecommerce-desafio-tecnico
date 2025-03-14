import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { JwtTokenModule } from '../../configs/security/jwt/jwt.token.module';
import { AuthGuard } from '../auth/auth.guard';
import { CategoriesRepository } from './categories.repository';
import { DatabaseModule } from '../../configs/database/database.module';
import { LoggerModule } from 'src/modules/configs/logger/logger.module';

@Module({
  imports: [JwtTokenModule, DatabaseModule, LoggerModule],
  providers: [CategoriesService, AuthGuard, CategoriesRepository],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
