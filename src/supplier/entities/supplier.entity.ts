import { ApiProperty } from "@nestjs/swagger";
import { PurchaseOrder, Product, Supplier } from "@prisma/client";

export class SupplierEntity implements Supplier {
	@ApiProperty()
	supplier_id: string;
	@ApiProperty()
	supplier_name: string;
	@ApiProperty()
	contact_info: string;
	@ApiProperty()
	email: string;
	@ApiProperty()
	address: string;
	@ApiProperty()
	phone: string;
	@ApiProperty()
	products: Product[];
	@ApiProperty()
	purchaseOrders: PurchaseOrder[];


}
