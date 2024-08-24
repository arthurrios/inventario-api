import { ApiProperty } from "@nestjs/swagger";
import { OrderItem, OrderItemStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class OrderItemEntity implements OrderItem {
	
	@ApiProperty()
	id: string;
	@ApiProperty()
	orderId: string;
	@ApiProperty()
	productId: string;
	@ApiProperty()
	quantity: number;
	@ApiProperty()
	unit_price: Decimal;
	@ApiProperty()
	status: OrderItemStatus;
	@ApiProperty()
	createdAt: Date;
	@ApiProperty()
	updatedAt: Date;

	
}
