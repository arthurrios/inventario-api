import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MinLength } from 'class-validator';

export class CreateCategoryDto {
	@ApiProperty()
	@IsString()
	@MinLength(3, { message: 'O nome da Categoria deve ter pelo menos 3 letras' })	
	name: string;

	@ApiProperty()
	@MinLength(10, { message: 'A descrição da Categoria deve ter pelo menos 10 letras' })
	description: string;

}
