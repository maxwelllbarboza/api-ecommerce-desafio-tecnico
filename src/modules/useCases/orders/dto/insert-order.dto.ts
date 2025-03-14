import { IsString, IsInt, Min, IsNotEmpty } from 'class-validator';

export class InsertOrderDto {
  @IsString()
  @IsNotEmpty({ message: 'O ID do produto é obrigatório' })
  productId: string;

  @IsInt()
  @Min(1, { message: 'A quantidade deve ser pelo menos 1' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  quantity: number;
}
