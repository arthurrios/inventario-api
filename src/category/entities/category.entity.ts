import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Category } from '@prisma/client';

export class CategoryEntity implements Category {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	description: string;


	@ApiProperty()
	products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;

	constructor(partial: Partial<CategoryEntity>) {
		Object.assign(this, partial);
	}
}
