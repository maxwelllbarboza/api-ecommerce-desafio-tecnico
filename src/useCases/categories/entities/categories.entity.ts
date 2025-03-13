import { Category } from '@prisma/client';

export class CategoriesEntity implements Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
