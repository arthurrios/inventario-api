import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsDate, IsOptional, ValidateNested, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { SaleDetailEntity } from 'src/sale-detail/entities/sale-detail.entity';
import { OrderItemStatus } from '@prisma/client';

export class CreateSaleDto {
	@ApiProperty()
	@IsDate({ message: 'A data deve ser uma data válida' })
	sale_date: Date;

	@ApiProperty()
	@IsString({ message: 'O ID do cliente deve ser uma string' })
	@IsUUID('4', { message: 'O ID do cliente deve ser um UUID válido' })
	customer_id: string;

	@ApiProperty()
	status: OrderItemStatus

	@ApiProperty({ type: [SaleDetailEntity] })
	@IsArray({ message: 'Os itens devem ser um array' })
	@ValidateNested({ each: true, message: 'Cada item deve ser um objeto válido' })
	@Type(() => SaleDetailEntity)
	saleDetails: SaleDetailEntity[];
}
