import { ApiProperty } from "@nestjs/swagger";
import { OrderItem } from "@prisma/client";

export class OrderItemEntity implements OrderItem {
	
	@ApiProperty()
	id: string;
	@ApiProperty()
	orderId: string;
	@ApiProperty()
	productId: string;
	@ApiProperty()
	quantity: number;
	
}
