import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.token.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || '74YLbq4%c!wU',
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || '2h' },
    }),
    JwtModule.register({
      secret: process.env.JWT_REFRESH_TOKEN_SECRET || '7jML9q4-c!s0',
      signOptions: {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '24h',
      },
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService, JwtModule],
})
export class JwtTokenModule {}
