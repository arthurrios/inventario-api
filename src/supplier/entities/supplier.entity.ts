import { ApiProperty } from "@nestjs/swagger";
import { PurchaseOrder, Product, Supplier } from "@prisma/client";

export class SupplierEntity implements Supplier {

	supplier_id: string;
	supplier_name: string;
	contact_info: string;
	email: string;
	address: string;
	phone: string;
	products: Product[];
	purchaseOrders: PurchaseOrder[];

}
