import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { JwtTokenService } from '../../configs/security/jwt/jwt.token.service';
import { LoggerService } from '../../configs/utils/logger/logger.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: JwtTokenService,
          useValue: {
            validateToken: jest.fn().mockResolvedValue(true),
          },
        },
        LoggerService,
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
