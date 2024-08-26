import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsPositive,
  MinLength,
  IsObject,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ required: true })
  @IsString({ message: 'O nome do produto deve ser uma string' })
  @MinLength(3, {
    message: 'O nome do produto deve ter pelo menos 3 caracteres',
  })
  product_name: string;

  @ApiProperty()
  unit_of_measure: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  @MinLength(10, { message: 'A descrição deve ter pelo menos 10 caracteres' })
  description: string;

  @ApiProperty({ required: true })
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @IsPositive({ message: 'O preço deve ser um valor positivo' })
  unit_price: Decimal;

  @ApiProperty({ required: true })
  @IsNumber({}, { message: 'A quantidade em estoque deve ser um número' })
  @IsPositive({ message: 'A quantidade em estoque deve ser um valor positivo' })
  quantity_in_stock: Decimal;

  @ApiProperty({
    description: 'Informações da categoria ou ID da categoria existente',
    type: 'object',
    readOnly: true,
  })
  category_id: string;

  @ApiProperty()
  code: string;
}
