import {
  ConflictException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import { LoggerService } from '../../infra/logger/logger.service';
import { emailAlreadyExists } from '../../common/resources/message';
import { Role } from '@prisma/client';
import { UserEntity } from './entities/user.entity';

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
    const userExists = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (userExists) {
      throw new ConflictException(emailAlreadyExists);
    }
    return await this.userRepository.create(createUserDto, role);
  }
}
