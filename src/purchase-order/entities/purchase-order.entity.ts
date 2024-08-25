import { ApiProperty } from "@nestjs/swagger";
import { OrderItemStatus, PurchaseOrder } from "@prisma/client";
import { PurchaseOrderDetailEntity } from "src/purchase-order-detail/entities/purchase-order-detail.entity";

export class PurchaseOrderEntity implements PurchaseOrder {
	@ApiProperty()
	purchase_order_id: string;
	@ApiProperty()
	order_date: Date;
	@ApiProperty()
	supplier_id: string;
	@ApiProperty()
	status: OrderItemStatus
	@ApiProperty({ type: [PurchaseOrderDetailEntity] })
	purchaseOrderDetails: PurchaseOrderDetailEntity[];

}

