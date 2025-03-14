import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { JwtTokenModule } from '../../configs/security/jwt/jwt.token.module';
import { AuthGuard } from '../auth/auth.guard';
import { ProductsRepository } from './products.repository';
import { LoggerService } from '../../configs/logger/logger.service';
import { DatabaseModule } from '../../configs/database/database.module';
import { LoggerModule } from 'src/modules/configs/logger/logger.module';

import { OrdersService } from '../orders/orders.service';

@Module({
  imports: [JwtTokenModule, DatabaseModule, LoggerModule],
  providers: [
    ProductsService,
    AuthGuard,
    ProductsRepository,
    LoggerService,
    OrdersService,
  ],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
