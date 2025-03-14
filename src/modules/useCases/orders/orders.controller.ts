import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UserId } from 'src/modules/configs/security/user-id.decorator';
import { InsertOrderDto } from './dto/insert-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ResponseOrderDto } from './dto/response-order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/roles/roles.decorator';
import { LoggerService } from 'src/modules/configs/logger/logger.service';
import { startLog } from 'src/modules/configs/logger/log-template';

@Roles(Role.ADMIN)
@Controller('order')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getOrders(@UserId() userId: string) {
    this.logger.info(startLog, OrdersController.name, this.getOrders.name);
    return this.ordersService.getOrder(userId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('admin')
  @HttpCode(HttpStatus.OK)
  async getAllOrders() {
    this.logger.info(startLog, OrdersController.name, this.getAllOrders.name);
    return this.ordersService.getAllOrders();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addToOrder(
    @UserId() userId: string,
    @Body() insertOrderDto: InsertOrderDto,
  ) {
    this.logger.info(startLog, OrdersController.name, this.addToOrder.name);
    return this.ordersService.addToOrder(userId, insertOrderDto);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async clearCart(@UserId() userId: string) {
    return this.ordersService.clearOrder(userId);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateQuantity(
    @UserId() userId: string,
    @Body() @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateQuantity(userId, updateOrderDto);
  }

  @Delete('/product/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeItem(
    @UserId() userId: string,
    @Param('productId') productId: string,
  ): Promise<void> {
    return await this.ordersService.removeItem(userId, productId);
  }

  @Get('finalizar')
  @HttpCode(HttpStatus.OK)
  async completePurchase(@UserId() userId: string): Promise<ResponseOrderDto> {
    return new ResponseOrderDto(
      await this.ordersService.completePurchase(userId),
    );
  }
}
