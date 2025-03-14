// import {
//     Controller,
//     Get,
//     Post,
//     Delete,
//     Body,
//     Param,
//     UseGuards,
//     UsePipes,
//     ValidationPipe,
//     Patch,
//     HttpStatus,
//     HttpCode,
//     BadRequestException,
//   } from '@nestjs/common';
//   import { OrdersService } from './orders.service';
//   import { InsertOrderDto } from './dto/insert-order.dto';
//   import { Roles } from '../auth/roles/roles.decorator';
//   import { Role } from '@prisma/client';
//   import { AuthGuard } from '../auth/auth.guard';
//   import { RolesGuard } from '../auth/roles/roles.guard';
//   import { LoggerService } from '../../configs/logger/logger.service';
//   import { startLog } from '../../configs/logger/log-template';
//   import { UserId } from '../../configs/security/user-id.decorator';
//   import { ResponseOrderDto } from './dto/response-order.dto';
//   import { UpdateOrderDto } from './dto/update-order.dto';
//   import { ResponseUpdateOrderDto } from './dto/response-update-order.dto';
//   import { ProductsService } from '../products/products.service';

//   @Roles(Role.USER, Role.ADMIN)
//   @UseGuards(AuthGuard, RolesGuard)
//   @Controller('order')
//   export class OrdersController {
//     constructor(
//       private readonly ordersService: OrdersService,
//       private readonly productsService: ProductsService,
//       private readonly logger: LoggerService,
//     ) {}

//     @Get()
//     @HttpCode(HttpStatus.OK)
//     async findOrderByUserId(@UserId() userId: string): Promise<ResponseOrderDto> {
//       return new ResponseOrderDto(
//         await this.ordersService.findOrderByUserId(userId),
//       );
//     }
//     @Delete()
//     @HttpCode(HttpStatus.OK)
//     async clearOrder(@UserId() userId: string) {
//       await this.ordersService.clear(userId);
//     }
//     @Delete('/product/:productId')
//     @HttpCode(HttpStatus.OK)
//     async deleteProductOrder(
//       @Param('productId') productId: string,
//       @UserId() userId: string,
//     ) {
//       return await this.ordersService.deleteProductOrder(productId, userId);
//     }

//     @UsePipes(ValidationPipe)
//     @Post()
//     @HttpCode(HttpStatus.CREATED)
//     async insertOrder(
//       @UserId() userId: string,
//       @Body() insertOrderDto: InsertOrderDto,
//     ): Promise<ResponseOrderDto> {
//       this.logger.info(startLog, OrdersController.name, this.insertOrder.name);
//       const productStock = await this.productsService.checkProductStock(
//         insertOrderDto,
//         userId,
//       );

//       if (!productStock) {
//         throw new BadRequestException(
//           `Estoque insuficiente para o produto ID ${insertOrderDto.productId}.`,
//         );
//       }

//       return new ResponseOrderDto(
//         await this.ordersService.insertOrder(userId, insertOrderDto),
//       );
//     }

//     @UsePipes(ValidationPipe)
//     @Patch()
//     @HttpCode(HttpStatus.OK)
//     async updateProductInOrder(
//       @Body() updateOrderDto: UpdateOrderDto,
//       @UserId() userId: string,
//     ): Promise<ResponseOrderDto> {
//       const productStock = await this.productsService.checkProductStock(
//         updateOrderDto,
//         userId,
//       );

//       if (!productStock) {
//         throw new BadRequestException(
//           `Estoque insuficiente para o produto ID ${updateOrderDto.productId}.`,
//         );
//       }
//       return new ResponseUpdateOrderDto(
//         await this.ordersService.updateProductOrder(updateOrderDto, userId),
//       );
//     }

//     @Get('/finalize/carrinho')
//     async finalizePurchase(@UserId() userId: string) {
//       this.logger.info(startLog, this.finalizePurchase.name, userId);

//       const order = await this.ordersService.finalizePurchase(userId);
//       return {
//         message: 'Purchase successfully completed!',
//       };
//     }
//   }
