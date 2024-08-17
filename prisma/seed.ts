import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
	// create two dummy categories
	const category1 = await prisma.category.create({
		data: {
			name: 'Produtos esportivos',
		},
	});

	const category2 = await prisma.category.create({
		data: {
			name: 'Produtos de limpeza',
		},
	});		

	// create ten dummy products
	// for (let i = 0; i < 10; i++) {
	// 	await prisma.product.create({
	// 		data: {
	// 			name: `Product ${i + 1}`,
	// 			price: 100 * (i + 1),
	// 			categoryId: String(i % 2 === 0 ? category1.id : category2.id),
	// 		},
	// 	});
	// }

	//crete 5 dummy suppliers
	



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