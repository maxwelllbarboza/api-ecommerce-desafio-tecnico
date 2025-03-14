import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '@prisma/client';
import { LoggerService } from 'src/modules/configs/logger/logger.service';
import { startLog } from 'src/modules/configs/logger/log-template';
@Roles(Role.ADMIN)
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @HttpCode(200)
  findAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    this.logger.info(startLog, CategoriesController.name, this.findAll.name);
    const pageNumber = page ? parseInt(page, 10) : 1;
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    return this.categoriesService.findAll(pageNumber, size);
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    this.logger.info(startLog, CategoriesController.name, this.findOne.name);
    return this.categoriesService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    this.logger.info(startLog, CategoriesController.name, this.create.name);
    return this.categoriesService.create(createCategoryDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    this.logger.info(startLog, CategoriesController.name, this.update.name);
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.info(startLog, CategoriesController.name, this.remove.name);
    return await this.categoriesService.remove(id);
  }
}
