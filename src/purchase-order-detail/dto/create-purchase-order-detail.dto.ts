import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsUUID, IsPositive, Min, IsOptional } from 'class-validator';

export class CreatePurchaseOrderDetailDto {

	@ApiProperty()
	@IsUUID('4', { message: 'O ID da compra deve ser um UUID válido' })
	@IsOptional()
	purchase_order_detail_id: string;

	@ApiProperty()
	@IsString({ message: 'O ID do produto deve ser uma string' })
	@IsUUID('4', { message: 'O ID do produto deve ser um UUID válido' }) // Validates UUID format (version 4)
	product_id: string;

	@ApiProperty()
	@IsNumber({}, { message: 'A quantidade deve ser um número' }) // Ensures it is a number
	@IsPositive({ message: 'A quantidade deve ser um valor positivo' }) // Quantity should be positive
	@Min(1, { message: 'A quantidade deve ser pelo menos 1' }) // Minimum value of 1
	quantity: number;

	@ApiProperty()
	@IsNumber({}, { message: 'O preço unitário deve ser um número' }) // Ensures it is a number
	@IsPositive({ message: 'O preço unitário deve ser um valor positivo' }) // Unit price should be positive
	unit_price: number;

	
}

