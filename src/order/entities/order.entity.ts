import { ApiProperty } from "@nestjs/swagger";
import { Order } from "@prisma/client";
import { OrderItemEntity } from "src/order-item/entities/order-item.entity";

export class OrderEntity implements Order{
	@ApiProperty()
	id: string;
	@ApiProperty()
	date: Date;
	@ApiProperty()
	supplierId: string;
	@ApiProperty()
	items: OrderItemEntity[];
	
}
