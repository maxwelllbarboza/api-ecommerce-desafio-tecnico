import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
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

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an empty array when findAll is called', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([]);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('should create a product', async () => {
    const newProduct: CreateProductDto = {
      name: 'Produto Exemplo',
      description: 'Descrição do produto',
      price: 99.99,
      stock: 10,
      categoryId: '12345',
    };
    const result = await controller.create(newProduct);
    expect(result).toEqual({ id: '1', name: 'Product' });
    expect(service.create).toHaveBeenCalledWith(newProduct);
  });
});
