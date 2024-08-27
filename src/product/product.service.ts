import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: createProductDto,
      });
      return product;
    } catch (error) {
      throw new BadRequestException('Falha ao criar o produto');
    }
  }

  async findOne(product_id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { product_id },
      });
      if (!product) {
        throw new NotFoundException(`Produto com id ${product_id} não encontrado`);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Falha ao buscar o produto');
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      throw new BadRequestException('Falha ao buscar os produtos');
    }
  }

  async findAllByCategory(category_id: string) {
    try {
      return await this.prisma.product.findMany({
        where: { category_id },
      });
    } catch (error) {
      throw new BadRequestException('Falha ao buscar os produtos');
    }
  }

  async finAllByPrice(minPrice: number, maxPrice: number) {
    try {
      return await this.prisma.product.findMany({
        where: {
          AND: [
            { unit_price: { gte: minPrice } },
            { unit_price: { lte: maxPrice } },
          ],
        },
      });
    } catch (error) {
      throw new BadRequestException('Falha ao buscar os produtos');
    }
  }

  async findProductsBySearch(search: string) {
    try {
      return await this.prisma.product.findMany({
        where: {
          OR: [
            { product_name: { contains: search } },
            { description: { contains: search } },
          ],
        },
      });
    } catch (error) {
      throw new BadRequestException('Falha ao buscar os produtos');
    }
  }

  async findProductsBySearchAndCategory(search: string, category_id: string) {
    try {
      return await this.prisma.product.findMany({
        where: {
          AND: [
            {
              OR: [
                { product_name: { contains: search } },
                { description: { contains: search } },
              ],
            },
            { category_id },
          ],
        },
      });
    } catch (error) {
      throw new BadRequestException('Falha ao buscar os produtos');
    }
  }

  async findProductsBySearchAndPrice(search: string, minPrice: number, maxPrice: number) {
    try {
      return await this.prisma.product.findMany({
        where: {
          AND: [
            {
              OR: [
                { product_name: { contains: search } },
                { description: { contains: search } },
              ],
            },
            {
              AND: [
                { unit_price: { gte: minPrice } },
                { unit_price: { lte: maxPrice } },
              ],
            },
          ],
        },
      });
    } catch (error) {
      throw new BadRequestException('Falha ao buscar os produtos');
    }
  }

  async findProductsBySearchAndCategoryAndPrice(search: string, category_id: string, minPrice: number, maxPrice: number) {
    try {category_id
      return await this.prisma.product.findMany({
        where: {
          AND: [
            {
              OR: [
                { product_name: { contains: search } },
                { description: { contains: search } },
              ],
            },
            { category_id: category_id },
            {
              AND: [
                { unit_price: { gte: minPrice } },
                { unit_price: { lte: maxPrice } },
              ],
            },
          ],
        },
      });
    } catch (error) {
      throw new BadRequestException('Falha ao buscar os produtos');
    }
  }

  async update(product_id: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { product_id },
        data: updateProductDto,
      });
      if (!updatedProduct) {
        throw new NotFoundException(`Produto com id ${product_id} não encontrado`);
      }
      return updatedProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Produto com id ${product_id} não encontrado`);
      }
      throw new BadRequestException('Falha ao atualizar o produto');
    }
  }

  async remove(product_id: string) {
    try {
      // Check for associations in sales and purchases
      const salesAssociation = await this.prisma.saleDetail.findFirst({
        where: { product_id },
      });
  
      if (salesAssociation) {
        throw new ConflictException(
          `Não é possível deletar o produto com id ${product_id} porque ele está associado a uma venda.`
        );
      }
  
      const purchaseAssociation = await this.prisma.purchaseOrderDetail.findFirst({
        where: { product_id },
      });
  
      if (purchaseAssociation) {
        throw new ConflictException(
          `Não é possível deletar o produto com id ${product_id} porque ele está associado a uma compra.`
        );
      }
  
      // Proceed to delete the product if no associations are found
      const product = await this.prisma.product.delete({
        where: { product_id },
      });
  
      return product;
    } catch (error) {
      console.log(error);
  
      // Rethrow specific exceptions
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
  
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Produto com id ${product_id} não encontrado`
          );
        }
      }
  
      // Generic error handling
      throw new BadRequestException('Falha ao deletar o produto');
    }
  }
  
  
  
}
