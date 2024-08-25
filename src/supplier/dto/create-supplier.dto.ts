import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateSupplierDto {
	@ApiProperty({ required: true })
	@IsString({ message: 'O nome deve ser uma string' })
	@IsNotEmpty({ message: 'O nome é obrigatório' })
	supplier_name: string;

	@ApiProperty()
	contact_info: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	address: string;

	@ApiProperty()
	phone: string;
}
