import { AuthGuard } from './auth.guard';
import { JwtTokenService } from '../../../common/services/jwt/jwt.token.service';
import { TestingModule, Test } from '@nestjs/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtTokenService: JwtTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtTokenService,
          useValue: {
            validateToken: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
