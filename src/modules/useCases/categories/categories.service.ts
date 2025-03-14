import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';
import { invalidUpdate } from '../../configs/message';
import { LoggerService } from 'src/modules/configs/logger/logger.service';
import { errorLog, startLog } from 'src/modules/configs/logger/log-template';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly logger: LoggerService,
  ) {}

  async findAll(page: number = 1, pageSize: number = 10) {
    this.logger.info(startLog, CategoriesService.name, this.findAll.name);
    return await this.categoriesRepository.findAll(page, pageSize);
  }
  async findOne(id: string) {
    this.logger.info(startLog, CategoriesService.name, this.findOne.name);
    await this.categoriesRepository.getCategoryById(id);
    this.logger.info(
      startLog,
      CategoriesService.name,
      this.categoriesRepository.getCategoryById.name,
    );
    return await this.categoriesRepository.findOne(id);
  }
  async create(createCategoryDto: CreateCategoryDto) {
    this.logger.info(startLog, CategoriesService.name, this.create.name);
    return await this.categoriesRepository.create(createCategoryDto);
  }
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    this.logger.info(startLog, CategoriesService.name, this.update.name);
    const data = Object.fromEntries(
      Object.entries(updateCategoryDto).filter(
        ([_, value]) => value !== undefined,
      ),
    );
    if (Object.keys(data).length === 0) {
      this.logger.error(errorLog, CategoriesService.name, invalidUpdate);
      throw new BadRequestException(invalidUpdate);
    }
    this.logger.info(
      startLog,
      CategoriesService.name,
      this.categoriesRepository.getCategoryById.name,
    );
    await this.categoriesRepository.getCategoryById(id);
    this.logger.info(
      startLog,
      CategoriesService.name,
      this.categoriesRepository.update.name,
    );
    return await this.categoriesRepository.update(id, updateCategoryDto);
  }
  async remove(id: string) {
    this.logger.error(errorLog, CategoriesService.name, this.remove.name);
    await this.categoriesRepository.getCategoryById(id);
    this.logger.error(
      errorLog,
      CategoriesService.name,
      this.categoriesRepository.getCategoryById.name,
    );
    return await this.categoriesRepository.remove(id);
  }
}
