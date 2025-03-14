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

@Roles(Role.ADMIN)
@Controller('order')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async addToCart(
    @UserId() userId: string,
    @Body() insertOrderDto: InsertOrderDto,
  ) {
    return this.ordersService.addToCart(userId, insertOrderDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCart(@UserId() userId: string) {
    return this.ordersService.getCart(userId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('admin/all')
  @HttpCode(HttpStatus.OK)
  async getAllCarts() {
    return this.ordersService.getAllCarts();
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async clearCart(@UserId() userId: string) {
    return this.ordersService.clearCart(userId);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateQuantity(
    @UserId() userId: string,
    @Body() @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateQuantity(userId, updateOrderDto);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async removeItem(@UserId() userId: string, insertOrderDto: InsertOrderDto) {
    return this.ordersService.removeItem(userId, insertOrderDto);
  }

  @Post('finalizar')
  @HttpCode(HttpStatus.OK)
  async completePurchase(@UserId() userId: string): Promise<ResponseOrderDto> {
    return new ResponseOrderDto(
      await this.ordersService.completePurchase(userId),
    );
  }
}
