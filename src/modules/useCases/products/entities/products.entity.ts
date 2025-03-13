import { Product } from '@prisma/client';

export class ProductsEntity implements Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
}
