import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.token.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '74YLbq4%c!wU',
      signOptions: { expiresIn: '2h' },
    }),
    JwtModule.register({
      secret: '7jML9q4-c!s0',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService, JwtModule],
})
export class JwtTokenModule {}
