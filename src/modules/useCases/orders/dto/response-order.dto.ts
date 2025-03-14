import { OrderEntity } from '../entities/orders.entity';
import { ResponseOrdersItemDto } from './response-orders-item.dto';

export class ResponseOrderDto {
  id: string;
  items?: ResponseOrdersItemDto[];

  constructor(order: OrderEntity) {
    this.id = order.id;
    this.items = order.items
      ? order.items.map((items) => new ResponseOrdersItemDto(items))
      : undefined;
  }
}
