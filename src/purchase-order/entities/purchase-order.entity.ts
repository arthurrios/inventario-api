import { ApiProperty } from "@nestjs/swagger";
import { OrderItemStatus, PurchaseOrder } from "@prisma/client";
import { PurchaseOrderDetailEntity } from "src/purchase-order-detail/entities/purchase-order-detail.entity";

export class PurchaseOrderEntity implements PurchaseOrder {
	
	purchase_order_id: string;
	order_date: Date;
	supplier_id: string;
	status: OrderItemStatus
	purchaseOrderDetails: PurchaseOrderDetailEntity[];

}

