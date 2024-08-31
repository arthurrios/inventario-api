import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseOrderDTO } from './create-purchase-order.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdatePurchaseOrderDto extends PartialType(CreatePurchaseOrderDTO) {
	
	@ApiProperty()
	@IsUUID('4', { message: 'O ID da compra deve ser um UUID válido' })
	purchase_order_detail_id
}
