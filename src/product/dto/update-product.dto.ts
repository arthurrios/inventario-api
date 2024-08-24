import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {

	@ApiProperty({ required: false })
	name: string;

	@ApiProperty({ required: false })
	description: string;

	@ApiProperty({ required: false })
	price: number;

	@ApiProperty({ required: false })
	categoryId: string;
}
