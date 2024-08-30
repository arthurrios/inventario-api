import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsDate, IsOptional, ValidateNested, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemStatus } from '@prisma/client';
import { PurchaseOrderDetailEntity } from 'src/purchase-order-detail/entities/purchase-order-detail.entity';
import { Decimal } from '@prisma/client/runtime/library';

export class CreatePurchaseOrderDto {
	@ApiProperty()
	@IsDate({ message: 'A data deve ser uma data válida' })
	order_date: Date;

	@ApiProperty()
	@IsString({ message: 'O ID do fornecedor deve ser uma string' })
	@IsUUID('4', { message: 'O ID do fornecedor deve ser um UUID válido' })
	supplier_id: string;

	@ApiProperty({ type: [PurchaseOrderDetailEntity] })
	@IsArray({ message: 'Os itens devem ser um array' })
	@ValidateNested({ each: true, message: 'Cada item deve ser um objeto válido' })
	@Type(() => PurchaseOrderDetailEntity)
	purchaseOrderDetails: PurchaseOrderDetailEntity[];

	@ApiProperty()
	status: OrderItemStatus

	@ApiProperty()
	totalPrice: Decimal;
}
