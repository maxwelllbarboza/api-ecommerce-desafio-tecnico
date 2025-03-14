import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/auth.guard';
import { LoggerService } from '../../configs/logger/logger.service';
import { JwtTokenModule } from '../../configs/security/jwt/jwt.token.module';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../../configs/database/database.module';
import { LoggerModule } from 'src/modules/configs/logger/logger.module';
import { ProductsService } from '../products/products.service';
import { ProductsRepository } from '../products/products.repository';
import { OrdersRepository } from './orders.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    AuthGuard,
    LoggerService,
    ProductsService,
    ProductsRepository,
    OrdersRepository,
  ],
  imports: [JwtTokenModule, UsersModule, DatabaseModule, LoggerModule],
  exports: [OrdersRepository],
})
export class OrdersModule {}
