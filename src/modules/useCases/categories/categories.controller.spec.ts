import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { LoggerService } from '../../configs/logger/logger.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let categoriesService: CategoriesService;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const mockCategoriesService = {
      findAll: jest.fn().mockResolvedValue(['category1', 'category2']),
      findOne: jest.fn().mockResolvedValue('category1'),
      create: jest.fn().mockResolvedValue('createdCategory'),
      update: jest.fn().mockResolvedValue('updatedCategory'),
      remove: jest.fn().mockResolvedValue(undefined),
    };

    const mockLoggerService = { info: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CategoriesService, useValue: mockCategoriesService },
        { provide: LoggerService, useValue: mockLoggerService },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    categoriesService = module.get<CategoriesService>(CategoriesService);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      await expect(controller.findAll('1', '10')).resolves.toEqual([
        'category1',
        'category2',
      ]);
      expect(categoriesService.findAll).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      await expect(controller.findOne('1')).resolves.toEqual('category1');
      expect(categoriesService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a category', async () => {
      const dto: CreateCategoryDto = { name: 'New Category' };
      await expect(controller.create(dto)).resolves.toEqual('createdCategory');
      expect(categoriesService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const dto: UpdateCategoryDto = { name: 'Updated Category' };
      await expect(controller.update('1', dto)).resolves.toEqual(
        'updatedCategory',
      );
      expect(categoriesService.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should delete a category', async () => {
      await expect(controller.remove('1')).resolves.toBeUndefined();
      expect(categoriesService.remove).toHaveBeenCalledWith('1');
    });
  });
});
