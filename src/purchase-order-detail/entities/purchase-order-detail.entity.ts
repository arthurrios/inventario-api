import { ApiProperty } from "@nestjs/swagger";
import { OrderItemStatus, PurchaseOrder, PurchaseOrderDetail } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class PurchaseOrderDetailEntity implements PurchaseOrderDetail {
	
	purchase_order_detail_id: string;
	purchase_order_id: string;
	product_id: string;
	quantity: Decimal;
	unit_price: Decimal;
	status: OrderItemStatus;
	created_at: Date;
	updated_at: Date;
	
}
	
