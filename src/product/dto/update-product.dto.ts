import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { IsObject } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ required: false })
  product_name: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  unit_price: Decimal;

  @ApiProperty({ required: false })
  category_id: string;

  @ApiProperty({ required: false })
  quantity_in_stock: Decimal;
}
