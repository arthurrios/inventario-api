import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
	@ApiProperty()
	date: Date;

	@ApiProperty()
	supplierId: string;

	//@ApiProperty()
	//items: OrderItemDto[];
	
	
}
