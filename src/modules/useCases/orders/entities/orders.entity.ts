import { $Enums, Order, OrderItem } from '@prisma/client';

export class OrderEntity implements Order {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  status: $Enums.OrderStatus;
  active: boolean;
  items?: OrderItem[];
}
