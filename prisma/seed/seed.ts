import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

const Categories = require('./data/categories');
const Products = require('./data/products');
const Suppliers = require('./data/suppliers');
const Orders = require('./data/orders');

async function main() {
  // Seed categories
  await Promise.all(
    Categories.map(async (category) => {
      await prisma.category.upsert({
        where: { id: category.id },
        update: {},
        create: category,
      });
    }),
  );

  // Seed products
  await Promise.all(
    Products.map(async (product) => {
      const category = await prisma.category.findUnique({
        where: { id: product.categoryId },
      });

      await prisma.product.upsert({
        where: { id: product.id },
        update: {},
        create: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity_in_stock: product.quantity_in_stock,
          category: { connect: { id: category.id } },
        },
      });
    }),
  );

  // Seed suppliers
  await Promise.all(
    Suppliers.map(async (supplier) => {
      await prisma.supplier.upsert({
        where: { id: supplier.id },
        update: {},
        create: supplier,
      });
    }),
  );

  // Seed orders
  await Promise.all(
    Orders.map(async (order) => {
      await prisma.order.upsert({
        where: { id: order.id },
        update: {},
        create: {
          id: order.id,
          date: order.date,
          supplier: { connect: { id: order.supplierId } },
          items: {
            create: order.items.map(item => ({
              product: { connect: { id: item.productId } },
              quantity: item.quantity,
              unit_price: item.unit_price,
              status: item.status,
            })),
          },
        },
      });
    }),
  );
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close Prisma Client at the end
    await prisma.$disconnect();
  });
