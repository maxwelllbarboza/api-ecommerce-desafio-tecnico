import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from '../../infra/database/database.service';
import { NotFoundError } from '../../common/interceptors/errors/types/NotFoundError';
import {
  invalidPagination,
  productNotFound,
} from '../../common/resources/message';
import { ProductsEntity } from './entities/products.entity';
import { LoggerService } from '../../infra/logger/logger.service';
import { errorLog } from '../../common/resources/log-template';

@Injectable()
export class ProductsRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly logger: LoggerService,
  ) {}

  async findAll(page: number = 1, pageSize: number = 10) {
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
    return await this.databaseService.product.findUnique({
      where: { id },
    });
  }

  async create(createProductDto: CreateProductDto) {
    return await this.databaseService.product.create({
      data: createProductDto,
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.databaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    await this.databaseService.product.delete({
      where: { id },
    });
  }

  async getProductById(id: string): Promise<ProductsEntity> {
    const product = await this.databaseService.product.findUnique({
      where: { id },
    });
    if (!product) {
      this.logger.error(errorLog, this.getProductById.name, productNotFound);
      throw new NotFoundError(productNotFound);
    }
    return product;
  }
}
