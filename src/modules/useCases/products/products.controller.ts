import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/roles/roles.guard';
import { LoggerService } from '../../configs/logger/logger.service';
import { startLog } from '../../configs/logger/log-template';

@Roles(Role.ADMIN)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    this.logger.info(startLog, ProductsController.name, this.findAll.name);

    const pageNumber = page ? parseInt(page, 10) : 1;
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    return this.productsService.findAll(pageNumber, size);
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    this.logger.info(startLog, ProductsController.name, this.findOne.name);
    return this.productsService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() createProductDto: CreateProductDto) {
    this.logger.info(startLog, ProductsController.name, this.create.name);
    return this.productsService.create(createProductDto);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    this.logger.info(startLog, ProductsController.name, this.update.name);
    return this.productsService.update(id, updateProductDto);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.logger.info(startLog, ProductsController.name, this.remove.name);
    return this.productsService.remove(id);
  }
}
