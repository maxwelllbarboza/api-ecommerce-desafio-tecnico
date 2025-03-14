import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InsertOrderDto } from './dto/insert-order.dto';
import { DatabaseService } from '../../configs/database/database.service';
import { orderActiveNotFound } from '../../configs/message';
import { OrderEntity } from './entities/orders.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { $Enums } from '@prisma/client';
import { OrderItemEntity } from './entities/orders-item.entity';

const LINE_AFFECTED = 1;

@Injectable()
export class OrdersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addToCart(userId: string, insertOrderDto: InsertOrderDto) {
    let order = await this.databaseService.order.findFirst({
      where: { userId, status: $Enums.OrderStatus.PENDING },
      include: { items: true },
    });

    if (!order) {
      order = await this.databaseService.order.create({
        data: { userId, status: $Enums.OrderStatus.PENDING },
        include: { items: true },
      });
    }

    const existingItem = order.items.find(
      (item) => item.productId === insertOrderDto.productId,
    );
    if (existingItem) {
      return this.databaseService.orderItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + insertOrderDto.quantity },
      });
    }
    return this.databaseService.orderItem.create({
      data: {
        orderId: order.id,
        productId: insertOrderDto.productId,
        quantity: insertOrderDto.quantity,
      },
    });
  }

  async getCart(userId: string): Promise<OrderEntity> {
    return await this.databaseService.order.findFirst({
      where: { userId, status: $Enums.OrderStatus.PENDING },
      include: { items: true },
    });
  }

  async getAllCarts(): Promise<OrderEntity[]> {
    return await this.databaseService.order.findMany({
      include: { items: true },
    });
  }

  async clearCart(userId: string): Promise<OrderEntity> {
    const order = await this.getCart(userId);
    if (!order) throw new NotFoundException('Carrinho não encontrado');
    await this.databaseService.orderItem.deleteMany({
      where: { orderId: order.id },
    });
    return await this.databaseService.order.delete({ where: { id: order.id } });
  }

  async updateQuantity(
    userId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderItemEntity> {
    const order = await this.getCart(userId);
    if (!order) throw new NotFoundException('Carrinho não encontrado');
    const item = order.items.find(
      (item) => item.productId === updateOrderDto.productId,
    );
    if (!item)
      throw new NotFoundException('Produto não encontrado no carrinho');
    return await this.databaseService.orderItem.update({
      where: { id: item.id },
      data: { quantity: updateOrderDto.quantity },
    });
  }

  async removeItem(userId: string, insertOrderDto: InsertOrderDto) {
    const order = await this.getCart(userId);
    if (!order) throw new NotFoundException('Carrinho não encontrado');

    return await this.databaseService.orderItem.deleteMany({
      where: { orderId: order.id, productId: insertOrderDto.productId },
    });
  }

  async completePurchase(userId: string): Promise<OrderEntity> {
    const cart = await this.getCart(userId);
    if (!cart) throw new NotFoundException('Carrinho não encontrado');

    for (const item of cart.items) {
      const product = await this.databaseService.product.findUnique({
        where: { id: item.productId },
      });
      if (!product || product.stock < item.quantity) {
        throw new BadRequestException(
          `Estoque insuficiente para ${product?.name || 'produto'}`,
        );
      }
    }

    for (const item of cart.items) {
      await this.databaseService.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }
    return await this.databaseService.order.update({
      where: { id: cart.id },
      data: { status: $Enums.OrderStatus.COMPLETED },
    });
  }
}
