import { ApiProperty } from "@nestjs/swagger";
import { InventoryCountDetail, Product, PurchaseOrderDetail, SaleDetail } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class ProductEntity implements Product  {

	product_id: string;
	product_name: string;
	description: string;
	code: string;
	unit_price: Decimal;
	unit_of_measure: string;
	quantity_in_stock: Decimal;
	created_at: Date;
	updated_at: Date;
	category_id: string;

	InventoryCountDetails?: InventoryCountDetail[];
	SalesDetails?: SaleDetail[];
	PurchaseOrderDetails?: PurchaseOrderDetail[];
}
