import { Test, TestingModule } from '@nestjs/testing';
import { OrdersItemService } from './orders-item.service';
import { OrdersItemRepository } from './orders-item.repository';

describe('OrdersItemService', () => {
  let service: OrdersItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersItemService,
        {
          provide: OrdersItemRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({ id: 1, product: 'Item' }),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersItemService>(OrdersItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
