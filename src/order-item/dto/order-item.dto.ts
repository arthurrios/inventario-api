import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsUUID, IsPositive, Min } from 'class-validator';
import { OrderItemStatus } from '@prisma/client';

export class OrderItemDto {
	@ApiProperty()
	@IsString({ message: 'O ID do produto deve ser uma string' })
	@IsUUID('4', { message: 'O ID do produto deve ser um UUID válido' }) // Validates UUID format (version 4)
	productId: string;

	@ApiProperty()
	@IsNumber({}, { message: 'A quantidade deve ser um número' }) // Ensures it is a number
	@IsPositive({ message: 'A quantidade deve ser um valor positivo' }) // Quantity should be positive
	@Min(1, { message: 'A quantidade deve ser pelo menos 1' }) // Minimum value of 1
	quantity: number;

	@ApiProperty()
	@IsNumber({}, { message: 'O preço unitário deve ser um número' }) // Ensures it is a number
	@IsPositive({ message: 'O preço unitário deve ser um valor positivo' }) // Unit price should be positive
	unit_price: number;

	@ApiProperty()
	@IsEnum(OrderItemStatus, { message: 'O status deve ser um dos valores válidos: PENDENTE, ENVIADO, ENTREGUE, CANCELADO' }) // Ensures valid enum value
	status: OrderItemStatus;
}

