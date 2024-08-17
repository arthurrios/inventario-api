import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
	@ApiProperty({ required: false })
	name: string;

	@ApiProperty()
	description: string;

}
