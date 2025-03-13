import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../infra/database/database.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesEntity } from './entities/categories.entity';
import { NotFoundError } from '../../common/interceptors/errors/types/NotFoundError';
import { cateroryNotFound } from '../../common/resources/message';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(page: number = 1, pageSize: number = 10) {
    const [categories, totalCount] = await Promise.all([
      this.databaseService.category.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { name: 'asc' },
      }),
      this.databaseService.category.count(),
    ]);
    return {
      categories,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      hasNextPage: page * pageSize < totalCount,
      hasPrevPage: page > 1,
    };
  }
  async findOne(id: string): Promise<CategoriesEntity> {
    const category = await this.databaseService.category.findUnique({
      where: { id },
    });
    return category;
  }
  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoriesEntity> {
    return await this.databaseService.category.create({
      data: createCategoryDto,
    });
  }
  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoriesEntity> {
    return await this.databaseService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }
  async remove(id: string): Promise<CategoriesEntity> {
    return await this.databaseService.category.delete({
      where: { id },
    });
  }
  async getCategoryById(id: string): Promise<CategoriesEntity> {
    const category = await this.databaseService.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundError(cateroryNotFound);
    }
    return category;
  }
}
