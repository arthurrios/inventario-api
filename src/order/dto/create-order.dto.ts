import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsDate, IsOptional, ValidateNested, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from 'src/order-item/dto/order-item.dto';

export class CreateOrderDto {
	@ApiProperty()
	@IsDate({ message: 'A data deve ser uma data válida' })
	date: Date;

	@ApiProperty()
	@IsString({ message: 'O ID do fornecedor deve ser uma string' })
	@IsUUID('4', { message: 'O ID do fornecedor deve ser um UUID válido' }) 
	supplierId: string;

	@ApiProperty({ type: [OrderItemDto] })
	@IsArray({ message: 'Os itens devem ser um array' })
	@ValidateNested({ each: true, message: 'Cada item deve ser um objeto válido' })
	@Type(() => OrderItemDto)
	items: OrderItemDto[];
}
