import { ApiProperty } from '@nestjs/swagger';
import { OrderItemDto } from 'src/order-item/dto/order-item.dto';


export class CreateOrderDto {
	@ApiProperty()
	date: Date;

	@ApiProperty()
	supplierId: string;

	@ApiProperty()
	items: OrderItemDto[];


}
