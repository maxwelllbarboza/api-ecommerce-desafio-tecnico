import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from '../../configs/database/database.service';
import { NotFoundError } from '../../configs/interceptors/types/NotFoundError';
import { invalidPagination, productNotFound } from '../../configs/message';
import { ProductsEntity } from './entities/products.entity';
import { LoggerService } from '../../configs/logger/logger.service';
import { errorLog, startLog } from '../../configs/logger/log-template';
import { InsertOrderDto } from '../orders/dto/insert-order.dto';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class ProductsRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly ordersService: OrdersService,
    private readonly logger: LoggerService,
  ) {}

  async findAll(page: number = 1, pageSize: number = 10) {
    this.logger.info(startLog, ProductsRepository.name, this.findAll.name);
    if (page < 1 || pageSize < 1) {
      this.logger.error(errorLog, this.findAll.name, invalidPagination);
      throw new BadRequestException(invalidPagination);
    }
    const [products, totalCount] = await Promise.all([
      this.databaseService.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { name: 'asc' },
      }),
      this.databaseService.product.count(),
    ]);

    return {
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      hasNextPage: page * pageSize < totalCount,
      hasPrevPage: page > 1,
    };
  }

  async findOne(id: string) {
    this.logger.info(startLog, ProductsRepository.name, this.findOne.name);
    return await this.databaseService.product.findUnique({
      where: { id },
    });
  }

  async create(createProductDto: CreateProductDto) {
    this.logger.info(startLog, ProductsRepository.name, this.create.name);
    return await this.databaseService.product.create({
      data: createProductDto,
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    this.logger.info(startLog, ProductsRepository.name, this.update.name);
    return await this.databaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    this.logger.info(startLog, ProductsRepository.name, this.remove.name);
    await this.databaseService.product.delete({
      where: { id },
    });
  }

  async getProductById(id: string): Promise<ProductsEntity> {
    this.logger.info(
      startLog,
      ProductsRepository.name,
      this.getProductById.name,
    );
    const product = await this.databaseService.product.findUnique({
      where: { id },
    });
    if (!product) {
      this.logger.error(errorLog, this.getProductById.name, productNotFound);
      throw new NotFoundError(productNotFound);
    }
    return product;
  }

  async checkProductStock(
    insertOrderDto: InsertOrderDto,
    userId: string,
  ): Promise<boolean> {
    this.logger.info(
      startLog,
      ProductsRepository.name,
      this.checkProductStock.name,
    );

    const productStock = await this.databaseService.product.findUnique({
      where: { id: insertOrderDto.productId },
    });
    return true;
  }
}
