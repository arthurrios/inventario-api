import { ApiProperty } from "@nestjs/swagger";
import { SaleDetail, OrderItemStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class SaleDetailEntity implements SaleDetail {
	
	@ApiProperty()
	sale_detail_id: string;
	@ApiProperty()
	sale_id: string;
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
