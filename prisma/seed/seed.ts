import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

const Categories = require('./data/categories');
const Products = require('./data/products');
const Suppliers = require('./data/suppliers');
const Purchases = require('./data/purchases');

async function main() {
  // Seed categories
  await Promise.all(
    Categories.map(async (category) => {
      await prisma.category.upsert({
        where: { category_id: category.category_id },
        update: {},
        create: category,
      });
    }),
  );

  // Seed products
  await Promise.all(
    Products.map(async (product) => {
      const category = await prisma.category.findUnique({
        where: { category_id : product.category_id },
      });

      await prisma.product.upsert({
        where: { product_id : product.product_id },
        update: {},
        create: {
          code: product.code,
          unit_of_measure: product.unit_of_measure,
          product_id: product.product_id,
          product_name: product.product_name,
          description: product.description,
          unit_price: product.unit_price,
          quantity_in_stock: product.quantity_in_stock,
          category: { connect: { category_id: category.category_id } },
        },
      });
    }),
  );

  // Seed suppliers
  await Promise.all(
    Suppliers.map(async (supplier) => {
      await prisma.supplier.upsert({
        where: { supplier_id: supplier.supplier_id },
        update: {},
        create: supplier,
      });
    }),
  );

  // Seed orders
  await Promise.all(
    Purchases.map(async (purchase) => {
      await prisma.purchaseOrder.upsert({
        where: { purchase_order_id: purchase.purchase_order_id },
        update: {},
        create: {
          purchase_order_id: purchase.purchase_order_id,
          order_date: purchase.date,
          supplier: { connect: { supplier_id: purchase.supplier_id } },
          status: purchase.status,
          purchaseOrderDetails: {
            create: purchase.items.map(item => ({
              product: { connect: { product_id: item.product_id } },
              quantity: item.quantity,
              unit_price: item.unit_price,
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
