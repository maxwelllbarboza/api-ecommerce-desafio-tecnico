import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { invalidUpdate } from '../../configs/message';
import { ProductsRepository } from './products.repository';
import { LoggerService } from '../../configs/logger/logger.service';
import { startLog } from '../../configs/logger/log-template';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private readonly logger: LoggerService,
  ) {}

  async findAll(page: number = 1, pageSize: number = 10) {
    this.logger.info(startLog, ProductsService.name, this.findAll.name);
    return await this.productsRepository.findAll(page, pageSize);
  }
  async findOne(id: string) {
    this.logger.info(startLog, ProductsService.name, this.findOne.name);
    await this.productsRepository.getProductById(id);
    return await this.productsRepository.findOne(id);
  }
  async create(createProductDto: CreateProductDto) {
    this.logger.info(startLog, ProductsService.name, this.create.name);
    return await this.productsRepository.create(createProductDto);
  }
  async update(id: string, updateProductDto: UpdateProductDto) {
    this.logger.info(startLog, ProductsService.name, this.update.name);
    await this.productsRepository.getProductById(id);
    const data = Object.fromEntries(
      Object.entries(updateProductDto).filter(
        ([_, value]) => value !== undefined,
      ),
    );
    if (Object.keys(data).length === 0) {
      this.logger.error(startLog, this.update.name, invalidUpdate);
      throw new BadRequestException(invalidUpdate);
    }

    return await this.productsRepository.update(id, updateProductDto);
  }
  async remove(id: string) {
    this.logger.info(startLog, ProductsService.name, this.remove.name);
    await this.productsRepository.getProductById(id);
    return await this.productsRepository.remove(id);
  }
}
