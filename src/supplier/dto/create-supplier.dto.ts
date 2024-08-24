import { ApiProperty } from "@nestjs/swagger";
import { Order, Product } from "@prisma/client";

export class CreateSupplierDto {
	@ApiProperty()
	id: string;
	@ApiProperty({ required: true })
	name: string;
	@ApiProperty()
	contact: string;
}

