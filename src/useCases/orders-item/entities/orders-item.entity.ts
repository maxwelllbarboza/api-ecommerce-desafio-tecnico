import { Order, OrderItem, Product } from '@prisma/client';

export class OrderItemEntity implements OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  order?: Order;
  product?: Product;
}
