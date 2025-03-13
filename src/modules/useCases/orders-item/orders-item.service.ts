import { Injectable } from '@nestjs/common';
import { OrdersItemRepository } from './orders-item.repository';
import { InsertOrderDto } from '../orders/dto/insert-order.dto';
import { ResponseOrderDto } from '../orders/dto/response-order.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { OrderItemEntity } from './entities/orders-item.entity';

@Injectable()
export class OrdersItemService {
  constructor(private readonly ordersItemRepository: OrdersItemRepository) {}

  async insertProductInOrder(
    insertOrderDto: InsertOrderDto,
    order: ResponseOrderDto,
  ) {
    const orderProduct = await this.ordersItemRepository.insertProductInOrder(
      insertOrderDto,
      order,
    );
  }
  async deleteProductOrder(productId: string, orderId: string) {
    return await this.ordersItemRepository.deleteProductOrder(
      productId,
      orderId,
    );
  }

  async updateProductOrder(
    updateOrderDto: UpdateOrderDto,
    order: ResponseOrderDto,
  ): Promise<OrderItemEntity> {
    return await this.ordersItemRepository.updateProductOrder(
      updateOrderDto,
      order,
    );
  }
}
