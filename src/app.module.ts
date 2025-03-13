import { Module } from '@nestjs/common';
import { ModulesModule } from './useCases/modules.module';
import { DatabaseModule } from './infra/database/database.module';
import { LoggerModule } from './infra/logger/logger.module';
import { BcryptModule } from './common/services/bcrypt/bcrypt.module';
import { JwtTokenModule } from './common/services/jwt/jwt.token.module';

@Module({
  imports: [
    ModulesModule,
    DatabaseModule,
    LoggerModule,
    BcryptModule,
    JwtTokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
