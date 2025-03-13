import { Module } from '@nestjs/common';
import { OrdersItemService } from './orders-item.service';
import { OrdersItemRepository } from './orders-item.repository';
import { ProductsModule } from '../products/products.module';
import { DatabaseModule } from '../../infra/database/database.module';

@Module({
  imports: [ProductsModule, DatabaseModule],
  providers: [OrdersItemService, OrdersItemRepository],
  exports: [OrdersItemService, OrdersItemRepository],
})
export class OrdersItemModule {}
