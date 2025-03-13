import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { LoggerService } from '../../configs/logger/logger.service';
import { UsersModule } from './users.module';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [UsersController],
      providers: [LoggerService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
});
