import { ApiProperty } from "@nestjs/swagger";
import { SaleDetail, OrderItemStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class SaleDetailEntity implements SaleDetail {
	
	sale_detail_id: string;
	sale_id: string;
	product_id: string;
	quantity: Decimal;
	unit_price: Decimal;
	status: OrderItemStatus;
	created_at: Date;
	updated_at: Date;

	
}
