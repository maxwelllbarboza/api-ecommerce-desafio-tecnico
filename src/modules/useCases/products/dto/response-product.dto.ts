import { ProductsEntity } from '../entities/products.entity';

export class ResponseProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;

  constructor(product: ProductsEntity) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.categoryId = product.categoryId;
  }
}
