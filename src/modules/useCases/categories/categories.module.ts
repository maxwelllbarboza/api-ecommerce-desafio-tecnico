import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { JwtTokenModule } from '../../../common/services/jwt/jwt.token.module';
import { AuthGuard } from '../auth/auth.guard';
import { CategoriesRepository } from './categories.repository';
import { LoggerService } from '../../../infra/logger/logger.service';
import { DatabaseModule } from '../../configs/database/database.module';

@Module({
  imports: [JwtTokenModule, DatabaseModule],
  providers: [
    CategoriesService,
    AuthGuard,
    CategoriesRepository,
    LoggerService,
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
