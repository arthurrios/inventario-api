import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('product')
export class ProductController {
	constructor(private readonly prisma: PrismaService) { }

	@Get()
	async getAllProducts() {
		return this.prisma.product.findMany();

	}

	@Get(':id')
	async getProductById(id: string) {
		return this.prisma.product.findUnique({
			where: {
				id: id
			}
		});
	}

	@Post()
	createProduct(product: any) {
		return this.prisma.product.create({
			data: product,
		});
	}

	@Put(':id')
	updateProduct(id: string, product: any) {
		return this.prisma.product.update({
			where: {
				id: id
			},
			data: product
		});
	}

	@Delete(':id')
	deleteProduct(id: string) {
		return this.prisma.product.delete({
			where: {
				id: id
			}
		});
	}
}