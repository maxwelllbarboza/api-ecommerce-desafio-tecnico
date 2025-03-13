import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';
import { invalidUpdate } from '../../common/resources/message';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAll(page: number = 1, pageSize: number = 10) {
    return await this.categoriesRepository.findAll(page, pageSize);
  }
  async findOne(id: string) {
    await this.categoriesRepository.getCategoryById(id);
    return await this.categoriesRepository.findOne(id);
  }
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesRepository.create(createCategoryDto);
  }
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const data = Object.fromEntries(
      Object.entries(updateCategoryDto).filter(
        ([_, value]) => value !== undefined,
      ),
    );
    if (Object.keys(data).length === 0) {
      throw new BadRequestException(invalidUpdate);
    }
    await this.categoriesRepository.getCategoryById(id);
    return await this.categoriesRepository.update(id, updateCategoryDto);
  }
  async remove(id: string) {
    await this.categoriesRepository.getCategoryById(id);
    return await this.categoriesRepository.remove(id);
  }
}
