import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNumber, Min, IsNotEmpty, Matches } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O nome do produto é obrigatório.' })
  @Transform(({ value }) => value?.trim(), { toClassOnly: true })
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0, { message: 'O valor deve ser um valor positivo.' })
  price: number;

  @ApiProperty()
  @IsNumber()
  @Min(0, { message: 'O estoque não pode ser negativo.' })
  stock: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'A categoria é obrigatório.' })
  @Matches(/^c[a-z0-9]{24}$/, {
    message: 'O ID da categoria deve ser um CUID válido',
  })
  categoryId: string;
}
