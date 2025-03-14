import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { LoggerService } from '../../configs/logger/logger.service';
import { ResponseUserDto } from './dto/response-user.dto';
import { startLog } from 'src/modules/configs/logger/log-template';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly logger: LoggerService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseUserDto> {
    this.logger.info(startLog, UsersController.name, this.createUser.name);
    return new ResponseUserDto(
      await this.usersService.createUser(createUserDto, Role.USER),
    );
  }
  @Post('admin')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async createUserAdmin(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseUserDto> {
    this.logger.info(startLog, UsersController.name, this.createUserAdmin.name);
    return new ResponseUserDto(
      await this.usersService.createUser(createUserDto, Role.ADMIN),
    );
  }
}
