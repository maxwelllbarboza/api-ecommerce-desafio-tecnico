import { IsString, IsInt, Min } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
