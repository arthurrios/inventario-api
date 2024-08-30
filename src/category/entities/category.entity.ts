import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Category } from '@prisma/client';

export class CategoryEntity implements Category {

	category_id: string;
	category_name: string;
	description: string;
	products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;

	constructor(partial: Partial<CategoryEntity>) {
		Object.assign(this, partial);
	}
}
