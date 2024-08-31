import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsDate, IsOptional, ValidateNested, IsUUID, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemStatus } from '@prisma/client';
import { PurchaseOrderDetailEntity } from 'src/purchase-order-detail/entities/purchase-order-detail.entity';
import { Decimal } from '@prisma/client/runtime/library';
import { CreatePurchaseOrderDetailDto } from 'src/purchase-order-detail/dto/create-purchase-order-detail.dto';


export class CreatePurchaseOrderDTO {


	@ApiProperty({
		description: 'ID do fornecedor',
		example: '123e4567-e89b-12d3-a456-426614174001',
	})
	@IsString()
	supplier_id: string;  

	@ApiProperty({
		description: 'Data da ordem de compra',
		example: '2024-08-31T10:00:00.000Z',
	})
	@IsDate()
	@Type(() => Date)
	order_date: Date;  

	@ApiProperty()
	@IsEnum(OrderItemStatus, { message: 'O status deve ser um dos valores válidos: PENDENTE, ENVIADO, ENTREGUE, CANCELADO' })
	status: OrderItemStatus;

	@ApiProperty({
		description: 'Detalhes da ordem de compra',
		type: [CreatePurchaseOrderDetailDto],
	})
	@ValidateNested({ each: true }) // Adiciona validação para cada item no array
	@Type(() => CreatePurchaseOrderDetailDto) // Transforma cada item em um instance de PurchaseOrderDetailDTO
	purchaseOrderDetails: CreatePurchaseOrderDetailDto[];
}