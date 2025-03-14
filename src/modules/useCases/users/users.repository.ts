import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { $Enums } from '@prisma/client';
import { UserEntity } from './entities/user.entity';
import { LoggerService } from '../../configs/logger/logger.service';
import { startLog } from 'src/modules/configs/logger/log-template';

@Injectable()
export class UserRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly logger: LoggerService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    role: $Enums.Role,
  ): Promise<UserEntity> {
    this.logger.info(startLog, UserRepository.name, this.create.name);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.databaseService.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        role: role,
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    this.logger.info(startLog, UserRepository.name, this.findByEmail.name);
    return this.databaseService.user.findUnique({
      where: { email },
    });
  }
}
