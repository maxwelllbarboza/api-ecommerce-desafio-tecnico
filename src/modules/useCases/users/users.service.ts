import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import { LoggerService } from '../../configs/logger/logger.service';
import { emailAlreadyExists } from '../../configs/message';
import { Role } from '@prisma/client';
import { UserEntity } from './entities/user.entity';
import { errorLog, startLog } from 'src/modules/configs/logger/log-template';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    role: Role,
  ): Promise<UserEntity> {
    this.logger.info(startLog, UsersService.name, this.createUser.name);
    const userExists = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (userExists) {
      this.logger.error(errorLog, UsersService.name, emailAlreadyExists);
      throw new ConflictException(emailAlreadyExists);
    }
    return await this.userRepository.create(createUserDto, role);
  }
}
