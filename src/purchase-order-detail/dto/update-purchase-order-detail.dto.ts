import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseOrderDetailDto } from './create-purchase-order-detail.dto';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePurchaseOrderDetailDto extends PartialType(CreatePurchaseOrderDetailDto) {

	@ApiProperty()
	@IsUUID('4', { message: 'O ID da compra deve ser um UUID válido' })
	purchase_order_detail_id

}
