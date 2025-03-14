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
import { startLog } from 'src/modules/configs/logger/log-template';
import { LoggerService } from 'src/modules/configs/logger/logger.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly logger: LoggerService,
  ) {}

  async addToOrder(userId: string, insertOrderDto: InsertOrderDto) {
    this.logger.info(startLog, OrdersService.name, this.checkProductStock.name);
    let order = await this.databaseService.order.findFirst({
      where: { userId, status: $Enums.OrderStatus.PENDING },
      include: { items: true },
    });

    this.logger.info(
      'Verificando se existe Order',
      OrdersService.name,
      this.checkProductStock.name,
    );

    if (!order) {
      this.logger.info(
        'Criando uma order nova',
        OrdersService.name,
        this.checkProductStock.name,
      );
      order = await this.databaseService.order.create({
        data: { userId, status: $Enums.OrderStatus.PENDING },
        include: { items: true },
      });
    }

    const existingItem = order.items.find(
      (item) => item.productId === insertOrderDto.productId,
    );

    this.logger.info(
      'Verificando se existe Item na order',
      OrdersService.name,
      this.checkProductStock.name,
    );

    if (existingItem) {
      const quantityTotal: number =
        existingItem.quantity + insertOrderDto.quantity;

      this.logger.info(
        'Verificando se existe estoque',
        OrdersService.name,
        this.checkProductStock.name,
      );

      const hasStock = await this.checkProductStock(
        insertOrderDto.productId,
        quantityTotal,
      );

      if (!hasStock) {
        this.logger.info(
          'estoque insuficiente',
          OrdersService.name,
          this.checkProductStock.name,
        );
        throw new NotFoundException(
          'Estoque insuficiente para o produto selecionado.',
        );
      }
      this.logger.info(
        'Atualizando com valor novo',
        OrdersService.name,
        this.checkProductStock.name,
      );
      return this.databaseService.orderItem.update({
        where: { id: existingItem.id },
        data: { quantity: quantityTotal },
      });
    }

    this.logger.info(
      'Verificando se existe estoque',
      OrdersService.name,
      this.checkProductStock.name,
    );

    const resultStock = await this.checkProductStock(
      insertOrderDto.productId,
      insertOrderDto.quantity,
    );

    if (!resultStock) {
      this.logger.info(
        'Estoque insuficiente',
        OrdersService.name,
        this.checkProductStock.name,
      );
      throw new NotFoundException(
        'Estoque insuficiente para o produto selecionado.',
      );
    }
    this.logger.info(
      'Criando um item novo',
      OrdersService.name,
      this.checkProductStock.name,
    );
    return this.databaseService.orderItem.create({
      data: {
        orderId: order.id,
        productId: insertOrderDto.productId,
        quantity: insertOrderDto.quantity,
      },
    });
  }

  async getOrder(userId: string): Promise<OrderEntity> {
    return await this.databaseService.order.findFirst({
      where: { userId, status: $Enums.OrderStatus.PENDING },
      include: { items: true },
    });
  }

  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.databaseService.order.findMany({
      include: { items: true },
    });
  }

  async clearOrder(userId: string): Promise<OrderEntity> {
    const order = await this.getOrder(userId);
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
    const resultStock = await this.checkProductStock(
      updateOrderDto.productId,
      updateOrderDto.quantity,
    );

    if (!resultStock) {
      this.logger.info(
        'estoque insuficiente',
        OrdersService.name,
        this.checkProductStock.name,
      );
      throw new NotFoundException(
        'Estoque insuficiente para o produto selecionado.',
      );
    }
    const order = await this.getOrder(userId);
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

  async removeItem(userId: string, productId: string): Promise<void> {
    const order = await this.getOrder(userId);
    if (!order.items || order.items.length === 0) {
      throw new NotFoundException('Carrinho está vazio');
    }
    await this.databaseService.orderItem.deleteMany({
      where: { orderId: order.id, productId },
    });
  }

  async completePurchase(userId: string): Promise<OrderEntity> {
    const order = await this.getOrder(userId);

    if (!order.items || order.items.length === 0) {
      throw new NotFoundException('Carrinho está vazio');
    }
    if (!order) throw new NotFoundException('Carrinho não encontrado');

    for (const item of order.items) {
      const product = await this.databaseService.product.findUnique({
        where: { id: item.productId },
      });
      if (!product || product.stock < item.quantity) {
        throw new BadRequestException(
          `Estoque insuficiente para ${product?.name || 'produto'}`,
        );
      }
    }

    for (const item of order.items) {
      await this.databaseService.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }
    return await this.databaseService.order.update({
      where: { id: order.id },
      data: { status: $Enums.OrderStatus.COMPLETED },
    });
  }

  private async checkProductStock(
    productId: string,
    quantityTotal: number,
  ): Promise<boolean> {
    this.logger.info(
      `Verificando estoque para o produto ${productId}`,
      OrdersService.name,
      this.checkProductStock.name,
    );

    try {
      const productStock = await this.databaseService.product.findUnique({
        where: { id: productId },
        select: { stock: true },
      });

      if (!productStock) {
        this.logger.warn(
          `Produto ${productId} não encontrado`,
          OrdersService.name,
          this.checkProductStock.name,
        );
        return false;
      }

      if (productStock.stock < quantityTotal) {
        this.logger.warn(
          `Estoque insuficiente para o produto ${productId}: solicitado ${quantityTotal}, disponível ${productStock.stock}`,
          OrdersService.name,
          this.checkProductStock.name,
        );
        return false;
      }

      this.logger.info(
        `Estoque disponível para o produto ${productId}`,
        OrdersService.name,
        this.checkProductStock.name,
      );
      return true;
    } catch (error) {
      this.logger.error(
        `Erro ao verificar estoque: ${error.message}`,
        OrdersService.name,
        this.checkProductStock.name,
      );
      throw new Error('Falha ao verificar estoque do produto');
    }
  }
}
