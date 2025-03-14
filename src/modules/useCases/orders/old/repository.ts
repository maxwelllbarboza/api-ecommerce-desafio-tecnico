// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InsertOrderDto } from './dto/insert-order.dto';
// import { DatabaseService } from '../../configs/database/database.service';
// import { orderActiveNotFound } from '../../configs/message';
// import { OrdersItemService } from '../orders-item/orders-item.service';
// import { OrderEntity } from './entities/orders.entity';
// import { UpdateOrderDto } from './dto/update-order.dto';
// import { $Enums } from '@prisma/client';

// const LINE_AFFECTED = 1;
// @Injectable()
// export class OrdersRepository {
//   constructor(
//     private readonly databaseService: DatabaseService,
//     private readonly ordersItemService: OrdersItemService,
//   ) {}

//   async insertProductInOrder(
//     userId: string,
//     insertOrderDto: InsertOrderDto,
//   ): Promise<OrderEntity> {
//     const order = await this.findOrderByUserId(userId, true).catch(async () => {
//       return await this.createOrder(userId);
//     });
//     await this.ordersItemService.insertProductInOrder(insertOrderDto, order);
//     return order;
//   }
//   async findOrderByUserId(
//     userId: string,
//     isRelations?: boolean,
//   ): Promise<OrderEntity> {
//     const order = await this.databaseService.order.findFirst({
//       where: {
//         userId,
//         active: true,
//       },
//       include: isRelations
//         ? { items: { include: { product: true } } }
//         : undefined,
//     });
//     if (!order) {
//       throw new NotFoundException(orderActiveNotFound);
//     }
//     return order;
//   }
//   async createOrder(userId: string): Promise<OrderEntity> {
//     return await this.databaseService.order.create({
//       data: {
//         userId,
//         active: true,
//       },
//     });
//   }
//   async clearOrder(userId: string) {
//     const order = await this.findOrderByUserId(userId);
//     await this.databaseService.order.delete({
//       where: { id: order.id },
//     });

//     return {
//       raw: [],
//       affected: LINE_AFFECTED,
//     };
//   }
//   async deleteProductOrder(productId: string, userId: string) {
//     const order = await this.findOrderByUserId(userId);
//     return await this.ordersItemService.deleteProductOrder(productId, order.id);
//   }
//   async updateProductOrder(
//     UpdateOrderDto: UpdateOrderDto,
//     userId: string,
//   ): Promise<OrderEntity> {
//     const order = await this.findOrderByUserId(userId, true).catch(async () => {
//       return await this.createOrder(userId);
//     });
//     await this.ordersItemService.updateProductOrder(UpdateOrderDto, order);
//     return order;
//   }

//   async finalizePurchase(userId: string) {
//     const order: OrderEntity = await this.findOrderByUserId(userId, true);

//     for (const item of order.items) {
//       const productStock = await this.databaseService.product.findUnique({
//         where: { id: item.productId },
//       });
//       if (!productStock) {
//         throw new NotFoundException(`Product with ID ${item.id} not found.`);
//       }

//       if (item.quantity > productStock.stock) {
//         throw new NotFoundException(
//           `Not enough stock for product ID ${item.productId}. Requested: ${item.quantity}, Available: ${productStock}`,
//         );
//       }
//     }
//     await this.updateOrderStatus(order.id, $Enums.OrderStatus.COMPLETED);

//     return order;
//   }

//   async updateOrderStatus(id: string, status: $Enums.OrderStatus) {
//     return await this.databaseService.order.update({
//       where: { id },
//       data: { status },
//     });
//   }
// }
