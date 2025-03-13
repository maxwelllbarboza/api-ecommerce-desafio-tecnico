import { Injectable, NotFoundException } from '@nestjs/common';
import { productNotFound } from '../../configs/message';
import { DatabaseService } from '../../configs/database/database.service';
import { InsertOrderDto } from '../orders/dto/insert-order.dto';
import { OrderItemEntity } from './entities/orders-item.entity';
import { ProductsService } from '../products/products.service';
import { ResponseOrderDto } from '../orders/dto/response-order.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';

@Injectable()
export class OrdersItemRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly productsService: ProductsService,
  ) {}

  private async verifyProductInOrder(
    productId: string,
    orderId: string,
  ): Promise<OrderItemEntity> {
    const orderProduct = await this.databaseService.orderItem.findFirst({
      where: { productId, orderId },
    });
    if (!orderProduct) {
      throw new NotFoundException(productNotFound);
    }
    return orderProduct;
  }
  private async createProductInOrder(
    insertOrderDto: InsertOrderDto,
    orderId: string,
  ): Promise<OrderItemEntity> {
    return await this.databaseService.orderItem.create({
      data: {
        quantity: insertOrderDto.quantity,
        productId: insertOrderDto.productId,
        orderId,
      },
    });
  }
  async insertProductInOrder(
    insertOrderDto: InsertOrderDto,
    order: ResponseOrderDto,
  ): Promise<OrderItemEntity> {
    await this.productsService.findOne(insertOrderDto.productId);

    const orderProduct = await this.verifyProductInOrder(
      insertOrderDto.productId,
      order.id,
    ).catch(() => undefined);

    if (!orderProduct) {
      return this.createProductInOrder(insertOrderDto, order.id);
    }

    return this.databaseService.orderItem.update({
      where: { id: orderProduct.id },
      data: {
        quantity: orderProduct.quantity + insertOrderDto.quantity,
      },
    });
  }
  async deleteProductOrder(productId: string, orderId: string) {
    const orderItem = await this.databaseService.orderItem.findFirst({
      where: {
        productId: productId,
        orderId: orderId,
      },
    });
    if (!orderItem) {
      throw new NotFoundException(productNotFound);
    }
    return await this.databaseService.orderItem.delete({
      where: { id: orderItem.id },
    });
  }

  async updateProductOrder(
    updateOrderDto: UpdateOrderDto,
    order: ResponseOrderDto,
  ): Promise<OrderItemEntity> {
    await this.productsService.findOne(updateOrderDto.productId);
    const orderProduct = await this.verifyProductInOrder(
      updateOrderDto.productId,
      order.id,
    );
    return await this.databaseService.orderItem.update({
      where: { id: orderProduct.id },
      data: {
        quantity: updateOrderDto.quantity,
      },
    });
  }
}
