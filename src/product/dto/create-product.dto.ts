import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsPositive, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ required: true })
  @IsString({ message: 'O nome do produto deve ser uma string' })
  @MinLength(3, { message: 'O nome do produto deve ter pelo menos 3 caracteres' })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  @MinLength(10, { message: 'A descrição deve ter pelo menos 10 caracteres' })
  description?: string;

  @ApiProperty({ required: true })
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @IsPositive({ message: 'O preço deve ser um valor positivo' })
  price: number;

  @ApiProperty({ required: true })
  @IsNumber({}, { message: 'A quantidade em estoque deve ser um número' })
  @IsPositive({ message: 'A quantidade em estoque deve ser um valor positivo' })
  quantity_in_stock: number;

  @ApiProperty({ required: true })
  @IsString({ message: 'O ID da categoria deve ser uma string' })
  @MinLength(1, { message: 'O ID da categoria deve ter pelo menos 1 caractere' })
  categoryId: string;
}
