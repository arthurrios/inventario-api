import { ApiProperty } from "@nestjs/swagger";
import { Product } from "@prisma/client";

export class ProductEntity implements Product  {
	@ApiProperty()
	id: string;
	@ApiProperty()
	name: string;
	@ApiProperty()
	description: string;
	@ApiProperty()
	price: number;
	@ApiProperty()
	quantity_in_stock: number;
	@ApiProperty()
	categoryId: string;
}
