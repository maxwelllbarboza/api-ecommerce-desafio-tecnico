import { Body, HttpCode, HttpStatus, Param, Injectable } from '@nestjs/common';
import { UserId } from 'src/modules/configs/security/user-id.decorator';
import { InsertOrderDto } from './dto/insert-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { LoggerService } from 'src/modules/configs/logger/logger.service';
import { startLog } from 'src/modules/configs/logger/log-template';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private readonly logger: LoggerService,
  ) {}

  async getOrder(@UserId() userId: string) {
    this.logger.info(startLog, OrdersService.name, this.getOrder.name);
    return this.ordersRepository.getOrder(userId);
  }

  @HttpCode(HttpStatus.OK)
  async getAllOrders() {
    this.logger.info(startLog, OrdersService.name, this.getAllOrders.name);
    return this.ordersRepository.getAllOrders();
  }

  async addToOrder(
    @UserId() userId: string,
    @Body() insertOrderDto: InsertOrderDto,
  ) {
    this.logger.info(startLog, OrdersService.name, this.addToOrder.name);
    return this.ordersRepository.addToOrder(userId, insertOrderDto);
  }

  async clearOrder(@UserId() userId: string) {
    this.logger.info(startLog, OrdersService.name, this.clearOrder.name);
    return this.ordersRepository.clearOrder(userId);
  }

  async updateQuantity(
    @UserId() userId: string,
    @Body() @Body() updateOrderDto: UpdateOrderDto,
  ) {
    this.logger.info(startLog, OrdersService.name, this.updateQuantity.name);
    return this.ordersRepository.updateQuantity(userId, updateOrderDto);
  }

  async removeItem(
    @UserId() userId: string,
    @Param('productId') productId: string,
  ): Promise<void> {
    this.logger.info(startLog, OrdersService.name, this.removeItem.name);
    return await this.ordersRepository.removeItem(userId, productId);
  }

  async completePurchase(@UserId() userId: string): Promise<void> {
    this.logger.info(startLog, OrdersService.name, this.completePurchase.name);
    await this.ordersRepository.completePurchase(userId);
  }
}
