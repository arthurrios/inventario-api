import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';
import { Product, Order } from '@prisma/client';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
	id: string;
	name?: string;
	contact?: string;
	// products?: Product[];
	// orders?: Order[];
}
