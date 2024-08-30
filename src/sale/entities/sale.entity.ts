import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Sale } from "@prisma/client";
import { SaleDetailEntity } from "src/sale-detail/entities/sale-detail.entity";

export class SaleEntity implements Sale {

	sale_id: string;
	sale_date: Date;
	customer_id: string;
	created_at: Date;
	updated_at: Date;
	status: $Enums.OrderItemStatus;	
	SaleDetails: SaleDetailEntity[];

}
