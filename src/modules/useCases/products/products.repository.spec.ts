import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from './products.repository';
import { DatabaseService } from '../../configs/database/database.service';
import { CreateProductDto } from '../products/dto/create-product.dto';

describe('ProductsRepository', () => {
  let repository: ProductsRepository;
  let prisma: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsRepository,
        {
          provide: DatabaseService,
          useValue: {
            product: {
              findMany: jest.fn().mockResolvedValue([]),
              findUnique: jest.fn().mockResolvedValue(null),
              create: jest.fn().mockResolvedValue({ id: '1', name: 'Product' }),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ProductsRepository>(ProductsRepository);
    prisma = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should return an empty array when findAll is called', async () => {
    const result = await repository.findAll();
    expect(result).toEqual([]);
    expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
  });

  it('should return null when findOne is called with a non-existing id', async () => {
    const result = await repository.findOne('999');
    expect(result).toBeNull();
    expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
  });

  it('should create a product successfully', async () => {
    const newProduct: CreateProductDto = {
      name: 'Produto Exemplo',
      description: 'Descrição do produto',
      price: 99.99,
      stock: 10,
      categoryId: '12345',
    };
    const result = await repository.create(newProduct);
    expect(result).toEqual({ id: '1', name: 'Product' });
    expect(prisma.product.create).toHaveBeenCalledTimes(1);
  });
});
