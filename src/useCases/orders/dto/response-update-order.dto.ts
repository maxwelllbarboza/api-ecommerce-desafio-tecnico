import { OrderEntity } from '../entities/orders.entity';

export class ResponseUpdateOrderDto {
  id: string;

  constructor(order: OrderEntity) {
    this.id = order.id;
  }
}
