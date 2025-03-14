import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: '1', name: 'Product' }),
            create: jest.fn().mockResolvedValue({ id: '1', name: 'Product' }),
            update: jest
              .fn()
              .mockResolvedValue({ id: '1', name: 'Updated Product' }),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an empty array when findAll is called', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
    expect(repository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should create a product', async () => {
    const newProduct: CreateProductDto = {
      name: 'Produto Exemplo',
      description: 'Descrição do produto',
      price: 99.99,
      stock: 10,
      categoryId: '12345',
    };
    const result = await service.create(newProduct);
    expect(result).toEqual({ id: '1', name: 'Product' });
    expect(repository.create).toHaveBeenCalledWith(newProduct);
  });
});
