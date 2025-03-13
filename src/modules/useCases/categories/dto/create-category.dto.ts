import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório.' })
  @Transform(({ value }) => value?.trim(), { toClassOnly: true })
  name: string;
}
