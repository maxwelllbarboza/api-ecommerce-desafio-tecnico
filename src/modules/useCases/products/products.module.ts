import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { JwtTokenModule } from '../../../common/services/jwt/jwt.token.module';
import { AuthGuard } from '../auth/auth.guard';
import { ProductsRepository } from './products.repository';
import { LoggerService } from '../../../infra/logger/logger.service';
import { DatabaseModule } from '../../configs/database/database.module';

@Module({
  imports: [JwtTokenModule, DatabaseModule],
  providers: [ProductsService, AuthGuard, ProductsRepository, LoggerService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
