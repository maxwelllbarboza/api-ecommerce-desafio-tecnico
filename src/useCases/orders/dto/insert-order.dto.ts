import { IsString, IsInt, Min } from 'class-validator';

export class InsertOrderDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
