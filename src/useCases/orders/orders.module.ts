import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { AuthGuard } from '../auth/auth.guard';
import { LoggerService } from '../../infra/logger/logger.service';
import { JwtTokenModule } from '../../common/services/jwt/jwt.token.module';
import { OrdersItemService } from '../orders-item/orders-item.service';
import { OrdersItemModule } from '../orders-item/orders-item.module';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../../infra/database/database.module';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    AuthGuard,
    LoggerService,
    OrdersItemService,
  ],
  imports: [JwtTokenModule, OrdersItemModule, UsersModule, DatabaseModule],
})
export class OrdersModule {}
