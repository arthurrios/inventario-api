import { ApiProperty } from "@nestjs/swagger";
import { OrderItemStatus, PurchaseOrder, PurchaseOrderDetail } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class PurchaseOrderDetailEntity implements PurchaseOrderDetail {
	

	@ApiProperty()
	purchase_order_detail_id: string;
	@ApiProperty()
	purchase_order_id: string;
	@ApiProperty()
	product_id: string;
	@ApiProperty()
	quantity: Decimal;
	@ApiProperty()
	unit_price: Decimal;
	@ApiProperty()
	status: OrderItemStatus;
	@ApiProperty()
	created_at: Date;
	@ApiProperty()
	updated_at: Date;
}
	
