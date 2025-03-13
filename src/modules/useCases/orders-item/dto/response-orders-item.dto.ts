import { ResponseOrderDto } from '../../orders/dto/response-order.dto';
import { OrderItemEntity } from '../entities/orders-item.entity';
import { ResponseProductDto } from '../../products/dto/response-product.dto';

export class ResponseOrdersItemDto {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  product?: ResponseProductDto;
  order?: ResponseOrderDto;

  constructor(orderItem: OrderItemEntity) {
    this.id = orderItem.id;
    this.quantity = orderItem.quantity;
    this.orderId = orderItem.orderId;
    this.productId = orderItem.productId;
    this.order = orderItem.order
      ? new ResponseOrderDto(orderItem.order)
      : undefined;
    this.product = orderItem.product
      ? new ResponseProductDto(orderItem.product)
      : undefined;
  }
}
