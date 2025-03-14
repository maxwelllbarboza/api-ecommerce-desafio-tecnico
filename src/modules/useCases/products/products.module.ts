import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { JwtTokenModule } from '../../configs/security/jwt/jwt.token.module';
import { AuthGuard } from '../auth/auth.guard';
import { ProductsRepository } from './products.repository';
import { DatabaseModule } from '../../configs/database/database.module';
import { LoggerModule } from 'src/modules/configs/logger/logger.module';
import { OrdersService } from '../orders/orders.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [JwtTokenModule, DatabaseModule, LoggerModule, OrdersModule],
  providers: [ProductsService, AuthGuard, ProductsRepository, OrdersService],
  controllers: [ProductsController],
  exports: [ProductsService, OrdersService],
})
export class ProductsModule {}
