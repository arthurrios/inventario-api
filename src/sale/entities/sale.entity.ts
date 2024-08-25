import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Sale } from "@prisma/client";
import { SaleDetailEntity } from "src/sale-detail/entities/sale-detail.entity";

export class SaleEntity implements Sale {
	@ApiProperty()
	sale_id: string;
	@ApiProperty()
	sale_date: Date;
	@ApiProperty()
	customer_id: string;
	@ApiProperty()
	created_at: Date;
	@ApiProperty()
	updated_at: Date;
	@ApiProperty()
	status: $Enums.OrderItemStatus;	

	@ApiProperty()
	SaleDetails: SaleDetailEntity[];

}
