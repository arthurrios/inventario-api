import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: true })
  price: number;

  @ApiProperty({ required: true })
  quantity_in_stock: number;

  @ApiProperty({ required: true })
  categoryId: string;
}
