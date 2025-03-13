import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtTokenService } from '../../configs/security/jwt/jwt.token.service';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../../configs/logger/logger.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtTokenService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-token'),
            verify: jest.fn().mockReturnValue({ userId: 1 }),
          },
        },
        LoggerService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
