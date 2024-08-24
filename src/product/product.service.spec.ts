import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProductService', () => {
  let service: ProductService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              findMany: jest.fn().mockResolvedValue([]),
              findUnique: jest.fn().mockResolvedValue({}),
              create: jest.fn().mockResolvedValue({}),
              update: jest.fn().mockResolvedValue({}),
              delete: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    expect(await service.findAll()).toEqual([]);
    expect(prismaService.product.findMany).toHaveBeenCalled();
  });

  it('should return a product by id', async () => {
    const productId = 'some-id';
    const product = { id: '1', code: 1, name: '', categoryId: 'category-id', description: '', price: 66, quantity_in_stock: 0 };
    jest.spyOn(prismaService.product, 'findUnique').mockResolvedValueOnce(product);
    expect(await service.findOne(productId)).toEqual(product);
    expect(prismaService.product.findUnique).toHaveBeenCalledWith({ where: { id: productId } });
  });

  let productDto = {
    code : 1,
    name: 'name',
    description: 'description',
    price: 0,
    categoryId: '1',
    image: 'image',
    quantity_in_stock: 30
  };

  it('should add a product', async () => {
    const createdProduct = { id: '1', ...productDto };
    jest.spyOn(prismaService.product, 'create').mockResolvedValueOnce(createdProduct);
    expect(await service.create(productDto)).toEqual(createdProduct);
    expect(prismaService.product.create).toHaveBeenCalledWith({ data: productDto });
  });

  it('should update a product', async () => {
    const updatedProduct = { id: '1', ...productDto };
    jest.spyOn(prismaService.product, 'update').mockResolvedValueOnce(updatedProduct);
    expect(await service.update('1', productDto)).toEqual(updatedProduct);
    expect(prismaService.product.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: productDto,
    });
  });

  it('should delete a product', async () => {
    const deletedProduct = { id: '1', ...productDto };
    jest.spyOn(prismaService.product, 'delete').mockResolvedValueOnce(deletedProduct);
    expect(await service.remove('1')).toEqual(deletedProduct);
    expect(prismaService.product.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });



  it('should return all products by category', async () => {
    const categoryId = 'category-id';
    const productsByCategory = [{ id: '1', code: 1, name: '' , categoryId : 'category-id', description: '', price: 66, quantity_in_stock: 0 }];
    jest.spyOn(prismaService.product, 'findMany').mockResolvedValueOnce(productsByCategory);
    expect(await service.findAllByCategory(categoryId)).toEqual(productsByCategory);
    expect(prismaService.product.findMany).toHaveBeenCalledWith({ where: { categoryId } });
  });

  it('should return all products by price', async () => {
    const minPrice = 0;
    const maxPrice = 100;
    const productsByPrice = [{ id: '1', name: 'product 1', price: 50, categoryId: '1', description: '', quantity_in_stock: 0, code: 1 }];
    jest.spyOn(prismaService.product, 'findMany').mockResolvedValueOnce(productsByPrice);
    expect(await service.finAllByPrice(minPrice, maxPrice)).toEqual(productsByPrice);
    expect(prismaService.product.findMany).toHaveBeenCalledWith({
      where: { price: { gte: minPrice, lte: maxPrice } },
    });
  });

  it('should return all products by search', async () => {
    const searchTerm = 'product';
    const productsBySearch = [{ id: '1', name: 'product 1', price: 50, categoryId: '1', description: '', quantity_in_stock: 0, code: 1 }];
    jest.spyOn(prismaService.product, 'findMany').mockResolvedValueOnce(productsBySearch);
    expect(await service.findProductsBySearch(searchTerm)).toEqual(productsBySearch);
    expect(prismaService.product.findMany).toHaveBeenCalledWith({
      where: { name: { contains: searchTerm, mode: 'insensitive' } },
    });
  });

  it('should return all products by search and category', async () => {
    const searchTerm = 'product';
    const categoryId = 'category-id';
    const productsBySearchAndCategory = [{ id: '1', name: 'product 1', price: 50, categoryId: '1', description: '', quantity_in_stock: 0, code: 1 }];
    jest.spyOn(prismaService.product, 'findMany').mockResolvedValueOnce(productsBySearchAndCategory);
    expect(await service.findProductsBySearchAndCategory(searchTerm, categoryId)).toEqual(productsBySearchAndCategory);
    expect(prismaService.product.findMany).toHaveBeenCalledWith({
      where: {
        name: { contains: searchTerm, mode: 'insensitive' },
        categoryId,
      },
    });
  });

  it('should return all products by search and price', async () => {
    const searchTerm = 'product';
    const minPrice = 0;
    const maxPrice = 100;
    const productsBySearchAndPrice = [{ id: '1', name: 'product 1', price: 50, categoryId: '1', description: '', quantity_in_stock: 0, code: 1 }];
    jest.spyOn(prismaService.product, 'findMany').mockResolvedValueOnce(productsBySearchAndPrice);
    expect(await service.findProductsBySearchAndPrice(searchTerm, minPrice, maxPrice)).toEqual(productsBySearchAndPrice);
    expect(prismaService.product.findMany).toHaveBeenCalledWith({
      where: {
        name: { contains: searchTerm, mode: 'insensitive' },
        price: { gte: minPrice, lte: maxPrice },
      },
    });
  });

  it('should return all products by search, category, and price', async () => {
    const searchTerm = 'product';
    const categoryId = 'category-id';
    const minPrice = 0;
    const maxPrice = 100;
    const productsBySearchCategoryAndPrice = [{ id: '1', name: 'product 1', price: 50, categoryId: '1', description: '', quantity_in_stock: 0, code: 1 }];
    jest.spyOn(prismaService.product, 'findMany').mockResolvedValueOnce(productsBySearchCategoryAndPrice);
    expect(await service.findProductsBySearchAndCategoryAndPrice(searchTerm, categoryId, minPrice, maxPrice)).toEqual(productsBySearchCategoryAndPrice);
    expect(prismaService.product.findMany).toHaveBeenCalledWith({
      where: {
        name: { contains: searchTerm, mode: 'insensitive' },
        categoryId,
        price: { gte: minPrice, lte: maxPrice },
      },
    });
  });
});
