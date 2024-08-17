import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

const Categories = require('./data/categories');
const Products = require('./data/products');

async function main() {

	await Promise.all(Categories.map(async (category) => {
		await prisma.category.upsert(
			{
				where: { id: category.id },
				update: {},
				create: category
			}
		);
	}));

	await Promise.all(Products.map(async (product) => {
		await prisma.product.upsert(
			{
				where: { id: product.id },
				update: {},
				create: product
			}
		);
	}));

	

}

// execute the main function
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		// close Prisma Client at the end
		await prisma.$disconnect();
	});