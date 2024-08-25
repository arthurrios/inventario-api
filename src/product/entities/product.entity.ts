import { ApiProperty } from "@nestjs/swagger";
import { Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class ProductEntity implements Product  {
	@ApiProperty()
	id: string;
	@ApiProperty()
	code: string;
	@ApiProperty()
	product_name: string;
	@ApiProperty()
	description: string;
	@ApiProperty()
	price: number;
	@ApiProperty()
	quantity_in_stock: Decimal;
	@ApiProperty()
	category_id: string;
	@ApiProperty()
	unit_price: Decimal;
	@ApiProperty()
	created_at: Date;
	@ApiProperty()
	updated_at: Date;
	@ApiProperty()
	unit_of_measure: string;
	@ApiProperty()
	product_id: string;

	@ApiProperty()
	category: {
			category_id: string;
			category_name: string;
			description: string;
	};
}
