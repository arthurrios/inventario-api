import { ApiProperty } from "@nestjs/swagger";
import { Order, Product, Supplier } from "@prisma/client";

export class SupplierEntity implements Supplier {
	@ApiProperty()
	id: string;
	@ApiProperty()
	name: string;
	@ApiProperty()
	contact: string;
	@ApiProperty()
	products: Product[];
	@ApiProperty()
	orders: Order[];


}
