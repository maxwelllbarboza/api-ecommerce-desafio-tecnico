import { Injectable, BadRequestException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { InsertOrderDto } from './dto/insert-order.dto';
import { LoggerService } from '../../configs/utils/logger/logger.service';
import { OrderEntity } from './entities/orders.entity';
import { startLog } from '../../configs/utils/logger/log-template';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly logger: LoggerService,
  ) {}
  async insertOrder(
    userId: string,
    insertOrderDto: InsertOrderDto,
  ): Promise<OrderEntity> {
    this.logger.info(startLog, OrdersService.name, this.insertOrder.name);
    return await this.ordersRepository.insertProductInOrder(
      userId,
      insertOrderDto,
    );
  }
  async findOrderByUserId(userId: string): Promise<OrderEntity> {
    this.logger.info(startLog, OrdersService.name, this.findOrderByUserId.name);
    return await this.ordersRepository.findOrderByUserId(userId, true);
  }
  async clear(userId: string) {
    return await this.ordersRepository.clearOrder(userId);
  }
  async deleteProductOrder(productId: string, userId: string) {
    return await this.ordersRepository.deleteProductOrder(productId, userId);
  }

  async updateProductOrder(
    UpdateOrderDto: UpdateOrderDto,
    userId: string,
  ): Promise<OrderEntity> {
    return await this.ordersRepository.updateProductOrder(
      UpdateOrderDto,
      userId,
    );
  }
}
