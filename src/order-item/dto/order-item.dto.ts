
import { ApiProperty } from "@nestjs/swagger";
import { OrderItemStatus } from "@prisma/client";


export class OrderItemDto {
	@ApiProperty()
	productId: string;
	@ApiProperty()
	quantity: number;
	@ApiProperty()
	unit_price: number;
	@ApiProperty()
	status: OrderItemStatus;
}
