import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/useCases/modules.module';
import { DatabaseModule } from './modules/configs/database/database.module';
import { LoggerModule } from './modules/configs/utils/logger/logger.module';
import { BcryptModule } from './modules/configs/security/bcrypt/bcrypt.module';
import { JwtTokenModule } from './modules/configs/security/jwt/jwt.token.module';

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
